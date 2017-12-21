const express = require('express');
const router = express.Router();

let RecieveService = require('./services/recieve/service');

const fb_token = process.env.FB_VERIFY_TOKEN;

//To Verify /webhook
router.get('/', (req, res) => {
    // Your verify token. Should be a random string.
  
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

    // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === fb_token) {
            
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
    }

});

router.post('/', (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        body.entry.forEach(function(entry) {
            if(entry.messaging) {
                let webhook_event = entry.messaging[0];
                let recieveService = new RecieveService();
                recieveService.receivedMessage(webhook_event, (request_body) => {
                    recieveService.callSendAPI(request_body);
                });
            }
        });
        console.log("RES IS SENT!");
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

module.exports = router;

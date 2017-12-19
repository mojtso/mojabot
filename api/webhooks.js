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
    console.log(body);
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(pageEntry => {
            pageEntry.messaging.forEach(messageEvent => {
                console.log("message", messageEvent);
                if(messageEvent.message) {
                    let recieveService = new RecieveService();
                    recieveService.receivedMessage(messageEvent, (messageMeta) => {
                        // recieveService.callSendAPI(senderID, message);
                        recieveService.callSendAPI(messageMeta);
                    });
                }
            });
        });
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

/*
router.get('/dummy', (req, res) => {
    var recieveService = new RecieveService();
    console.log(recieveService);
});

router.post('/dummy', (req, res) => {
    var recieveService = new RecieveService();
    console.log(recieveService);
    recieveService.receivedMessage(req.body, (data, message) => {
        res.status(200).json({
            data: data,
            message: message
        });
    });
});
*/

module.exports = router;

'use strict';

let BaseService = require('../base-service');


class RecieveService extends BaseService {
    
    constructor() {
        super();
    }

    receivedMessage(event, callback) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        
        if(message.quick_replies) {

        } else {
            let response = {
                "text": "Hi :)! If theres anything you need, select from the list.",
                "quick_replies": [
                    {
                        "content_type":"text",
                        "title":"Movies",
                        "payload":"0"
                        },
                        {
                        "content_type":"text",
                        "title":"News",
                        "payload":"1"
                        },
                        {
                        "content_type":"text",
                        "title":"Todays weather",
                        "payload":"2"
                    }
                ]
            };
    
            let request_body = {
                "recipient": {
                  "id": senderID
                },
                "message": response
            }
    
            callback(request_body);
        }
        console.log("RETURNING FROM A CALLBACK!!")
        return;
    }
}

module.exports = RecieveService;
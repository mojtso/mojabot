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
        
        console.log(message.quick_reply);

        if(message.quick_replies) {
            var quickReplyPayload = message.quick_replies;

            if(quickReplyPayload === "0") {
                console.log("Payload is ", quickReplyPayload);
            } else if(quickReply === "1") {
                console.log("Payload is ", quickReplyPayload);
            } else if (quickReplyPayload === "2") {
                console.log("Payload is ", quickReplyPayload);
            }
            callback(null)

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

        return;
    }
}

module.exports = RecieveService;
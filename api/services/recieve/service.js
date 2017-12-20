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

        
        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Hi, do you want to play outside?",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "No..",
                            "payload": "DEVELOPER_DEFINED_PAYLOAD"
                        },
                        {
                            "type": "postback",
                            "title": "Yes!",
                            "payload": "DEVELOPER_DEFINED_PAYLOAD"   
                        }
                    ]
                }
            }
        };

        let request_body = {
            "recipient": {
              "id": senderID
            },
            "message": response
        }

        callback(request_body);
    }
}

module.exports = RecieveService;
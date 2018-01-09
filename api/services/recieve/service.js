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
            "text": "Hi :)! If theres anything you need, select from the list.",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Movies",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
                    },
                    {
                    "content_type":"text",
                    "title":"News",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
                    },
                    {
                    "content_type":"text",
                    "title":"Todays weather",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
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
}

module.exports = RecieveService;
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

        
        // let response = {
        //     "text": "Hi, do you want to play outside? ",
        //     "quick_replies": [
        //         {
        //             "content_type":"text",
        //             "title":"Action",
        //             "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        //             },
        //             {
        //             "content_type":"text",
        //             "title":"Comedy",
        //             "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        //             },
        //             {
        //             "content_type":"text",
        //             "title":"Drama",
        //             "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        //         }
        //     ]
        // };

        let response = {
            "text": event.message.text
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
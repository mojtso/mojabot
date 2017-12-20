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
            "text": `You sent the message: "${event.text}"!`
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
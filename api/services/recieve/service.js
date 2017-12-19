'use strict';

let BaseService = require('../base-service');


class RecieveService extends BaseService {
    
    constructor() {
        super();
    }

    receivedMessage(messagingEvent, callback) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;

        var isEcho = message.is_echo;
        var messageId = message.mid;
        var appId = message.app_id;
        var metadata = message.metadata;

        let messageMeta = {
            recipient: {
                id: senderID
            },
            message: {
                text: "This is a response from bot request",
                metadata: "DEVELOPER_DEFINED_METADATA"
            }
        };

        callback(messageMeta);
    }
}

module.exports = RecieveService;
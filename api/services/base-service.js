'use strict';
const request = require('request');

class BaseService {
    constructor() {
        
    }

    callSendAPI(messageData) {
      // console.log("REQUEST_BODY",messageData);
      // console.log("ACCESS_TOKEN", process.env.PAGE_ACCESS_TOKEN);
      request({
          "uri": "https://graph.facebook.com/v2.6/me/messages",
          "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
          "method": "POST",
          "json": messageData
      
        }, function (error, response, body) { 
            if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
      
            if (messageId) {
              console.log("Successfully sent message with id %s to recipient %s",
                messageId, recipientId);
            } else {
              console.log("Successfully called Send API for recipient %s",
              recipientId);
            }
          } else {
            console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
          }
      });
    }
}

module.exports = BaseService;
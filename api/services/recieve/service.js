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
        
        if(message.quick_reply) {
            var quickReplyPayload = message.quick_reply;

            switch (quickReplyPayload.payload) {
                case '0':
                    //select movies genre
                    // var response = movies();
                    // console.log("--- Movies IN QUICK REPLY ---");
                    // console.log(response);
                    
                    break;
                case '1':
                    //select news category

                    break;
                case '2':
                    //request location for weather

                    break;
                default:
                    break;
            }
            let data = {
                "attachment":{
                    "type":"template",
                    "payload":{
                      "template_type":"generic",
                      "elements":[
                         {
                          "title":"Welcome to Peter'\''s Hats",
                          "image_url":"https://in.pinterest.com/pin/495044184024461136/",
                          "subtitle":"We'\''ve got the right hat for everyone.",
                          "default_action": {
                            "type": "web_url",
                            "url": "https://in.pinterest.com/pin/495044184024461136/",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://in.pinterest.com/pin/495044184024461136/"
                          },
                          "buttons":[
                            {
                                "type":"postback",
                                "title":"Start Chatting",
                                "payload":"DEVELOPER_DEFINED_PAYLOAD"
                            },
                            {
                                "type":"postback",
                                "title":"Start Chatting",
                                "payload":"DEVELOPER_DEFINED_PAYLOAD"
                            }              
                          ]      
                        }
                      ]
                    }
                }
            };

            let request_body = {
                "recipient": {
                  "id": senderID
                },
                "message": data
            };

            callback(request_body);

        } else {
            //send a quick reply
            let data = {
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
                "message": data
            }

            callback(request_body);
        }

        return;
    }

}

module.exports = RecieveService;
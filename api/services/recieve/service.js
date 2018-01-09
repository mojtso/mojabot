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
           
            console.log(quickReplyPayload.payload);
            switch (quickReplyPayload.payload) {
                case '0':
                    //select movies genre
                    // var response = movies();
                    // console.log("--- Movies IN QUICK REPLY ---");
                    // console.log(response);
                    let data = {
                        "attachment":{
                            "type":"template",
                            "payload":{
                              "template_type":"generic",
                              "elements":[
                                 {
                                  "title":"Welcome to Peter'\''s Hats",
                                  "image_url":"https://petersfancybrownhats.com/company_image.png",
                                  "subtitle":"We'\''ve got the right hat for everyone.",
                                  "default_action": {
                                    "type": "web_url",
                                    "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                  },
                                  "buttons":[
                                    {
                                      "type":"web_url",
                                      "url":"https://petersfancybrownhats.com",
                                      "title":"View Website"
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
                    console.log(data);
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

            callback(null)

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





    movies() {
        // Action. Adventure. Animation. Biography. Comedy. Crime.
        // Horror. Music. Musical. Mystery. Romance. Sci-Fi.
        
        
        return data;
    }

}

module.exports = RecieveService;
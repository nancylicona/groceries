//
// Stores a user choice in Botkit 'users' storage, so that the value can be retreived later
//
module.exports = function (controller) {

    controller.hears([/^toadd$/], 'direct_message,direct_mention', function (bot, message) {
            "utterances": [],
            "parameters": [],
            "response": {
                "type": "mb",
                "value": "add"
            }
    }
}

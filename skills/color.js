//
// Simplest use of Botkit's conversation system
//
module.exports = function (controller) {

    controller.hears([/^favorit/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask('I see you have a new favorite item/food. What I item/food is it?', function (response, convo) {
                convo.say("Cool, I added '" + response.text + "' to your list of favorites!");
                convo.next();
            });
        });

    });
};

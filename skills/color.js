//
// Simplest use of Botkit's conversation system
//
module.exports = function (controller) {

    controller.hears([/^favorite$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('I see you have a new favorite food/item!');

            convo.ask('What item/food is it?', function (response, convo) {
                convo.say("Cool, I added '" + response.text + "' to your list of favorites!");
                convo.next();
            });
        });

    });
};

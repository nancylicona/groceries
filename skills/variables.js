//
// Threaded conversation where variables are set to store user choices
//
module.exports = function (controller) {

    controller.hears([/^variables$/], "direct_message,direct_mention", function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask("What was your favorite meal today?", [
                {
                    pattern: "^breakfast|lunch|dinner|snack|dessert",
                    callback: function (response, convo) {
                        convo.gotoThread("confirm_choice");
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.gotoThread('bad_response');
                    }
                }
            ], { key: "answer" });


            // Bad response
            convo.addMessage({
                text: "Sorry, I don't know this color.<br/>_Tip: try breakfast, lunch, dinner, snack or dessert!_",
                action: 'default',
            }, 'bad_response');

            // Confirmation thread
            convo.addMessage(
                "You picked '{{responses.answer}}'",
                "confirm_choice");

            convo.addQuestion("Please, confirm your choice ? (yes|no)", [
                {
                    pattern: "^yes|hey|oui|si|da$",
                    callback: function (response, convo) {
                        var pickedColor = convo.extractResponse('answer');
                        convo.setVar("color", pickedColor);
                        convo.gotoThread("success");
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.transitionTo("default", "Got it, let's try again...");
                    }
                }
            ], {}, "confirm_choice");

            // Success thread
            convo.addMessage(
                "Cool, I love '{{vars.color}}' too! Remember the recipe for later",
                "success");
        });
    });
};

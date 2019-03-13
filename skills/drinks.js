//
// Example of a conversation with a menu that loops until explicitly stopped
//
module.exports = function (controller) {

    controller.hears([/^drinks/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            var question = "Here are a few proposed recipe websites:";
            question += "<br/> `1)` Smoothie options (**smoothies**)";
            question += "<br/> `2)` Coffee options (**coffee**)";
            question += "<br/> `3)` Boba tea options (**boba**)";
            question += "<br/> `4)` Healthy options (**healthy**)";             
            question += "\n\nWhat do you want to check?<br/>_(type a number, a **bold keyword** or `stop`)_";
            convo.ask(question, [
                {
                    pattern: "1|smoothies|smoothie",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_1');
                    },
                }
                , {
                    pattern: "2|coffee|coffees",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_2');
                    },
                }
                , {
                    pattern: "3|boba|bobas|bobatea|tea",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_3');
                    },
                }
                , {
                    pattern: "4|healthy",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_4');
                  },
                }
                , {
                    pattern: "cancel|stop",
                    callback: function (response, convo) {
                        convo.gotoThread('action_cancel');
                    },
                }
                , {
                    default: true,
                    callback: function (response, convo) {
                        convo.gotoThread('bad_response');
                    }
                }
            ]);

            // Menu option 1)
            convo.addMessage({
                text: "Alright! Time for a [smoothie](https://www.foodnetwork.com/recipes/articles/50-smoothies). Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_1');

            // Menu option 2)
            convo.addMessage({
                text: "But first! [Coffee](https://www.allrecipes.com/recipes/134/drinks/coffee/) from your favorite website. Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_2');

            // Menu option 3)
            convo.addMessage({
                text: "[Boba tea time](https://www.bubbleteasupply.com/bubble-tea-recipes/). Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_3');

             // Menu option 4)
            convo.addMessage({
                 text: "Lets be healthy today! [Healthy options](http://www.weightloss.com.au/healthy-recipes/drink-recipes/). Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_4');                    
            
            // Cancel
            convo.addMessage({
                text: "Got it, cancelling...",
                action: 'stop', // this marks the converation as unsuccessful
            }, 'action_cancel');

            // Bad response
            convo.addMessage({
                text: "Sorry, I did not understand.",
                action: 'default',
            }, 'bad_response');

        });
    });
};

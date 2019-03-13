//
// Example of a conversation with a menu that loops until explicitly stopped
//
module.exports = function (controller) {

    controller.hears([/^recipe/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            var question = "Here are a few proposed recipe websites:";
            question += "<br/> `1)` Breakfast options (**Breakfast**)";
            question += "<br/> `2)` Vegan options (**Vegan**)";
            question += "<br/> `3)` Meal options (**Meal**)";
            question += "<br/> `4)` Dessert options (**Dessert**)";
            question += "<br/> `5)` Quick and Easy options (**QE**)";               
            question += "\n\nWhat do you want to check?<br/>_(type a number, a **bold keyword** or `stop`)_";
            convo.ask(question, [
                {
                    pattern: "1|breakfast|breakfasts|Breakfasts|Breakfast",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_1');
                    },
                }
                , {
                    pattern: "2|Vegan|vegan|vegans|Vegans",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_2');
                    },
                }
                , {
                    pattern: "3|meal|meals|Meal|Meals",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_3');
                    },
                }
                , {
                    pattern: "4|dessert|desserts|Dessert|Desserts",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_4');
                  },
                }
                , {
                    pattern: "5|Quick|Easy|QE|QuickandEasy",
                    callback: function (response, convo) {
                        convo.gotoThread('menu_5');
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
                text: "The most important meal of the day [Breakfast](https://www.tasteofhome.com/course/breakfast-recipes/). Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_1');

            // Menu option 2)
            convo.addMessage({
                text: "[Vegan recipes](https://cookieandkate.com/2018/29-vegan-dinner-recipes/) you will enjoy it. Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_2');

            // Menu option 3)
            convo.addMessage({
                text: "Bon appetit! [Meal time](https://www.allrecipes.com/recipes/17562/dinner/). Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_3');

             // Menu option 4)
            convo.addMessage({
                 text: "First [Dessert](https://www.allrecipes.com/recipes/79/desserts/). Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_4');           

            // Menu option 5)
            convo.addMessage({
                text: "On a rush? [Quick and easy recipe](https://greatist.com/eat/10-minute-recipes) options. Check the online recipes and pick your favorite!",
                action: 'default'
            }, 'menu_5');            
            
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

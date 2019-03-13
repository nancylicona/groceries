//
// Simplest use of Botkit's conversation system
//
module.exports = function (controller) {
    

    controller.hears([/^favorit/], 'direct_message,direct_mention', function (bot, message) {
   "name": "addTodo",
   "favorite": [],
   "parameters": [],
   "response": {
         "type": "mb",
         "value": "add"
    }
        bot.startConversation(message, function (err, convo) {

            convo.ask('I see you have a new favorite item/food. What item/food is it?', function (response, convo) {
                convo.say("Cool, I added '" + response.text + "' to your list of favorites!");
                myObj.favorite[i]=response.text;
             }   
           convo.say("Displaying your list of favorites:");        
            for (i in myObj.favorite) {
                x = myObj.favorite[i];
                console.log(x);
            }
           convo.next();            
                

            });
        });

    });
};

const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {

  message.delete({ timeout: 1000 });
 
  client.channels.cache.get(args[0]).messages.fetch(args[1]).then(function (message) {
        message.react(args[2])
});
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.REACT;
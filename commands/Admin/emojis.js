const { MESSAGES } = require("../../util/constants");

exports.run = (client, message, args) => {

		message.guild.emojis.cache.forEach(e => console.log(e));
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.EMOJIS;
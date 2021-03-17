//XDemon
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {
  message.delete({ timeout: 1000 });
const ayy = client.emojis.cache.find(emoji => emoji.name === args[0]);


console.log(ayy)
   message.channel.send(`${ayy}`);
};

module.exports.help = MESSAGES.COMMANDS.FUNNY.EMOTE;
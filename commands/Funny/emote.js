const { MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {
  message.delete({ timeout: 1000 });
const ayy = client.emojis.cache.find(emoji => emoji.name === args[0]);


console.log(ayy)
   message.channel.send(`${ayy}`);
};

module.exports.help = {
  name: "emote",
  aliases: ["e", "emo"],
  category: "funny",
  description: "Renvoi un emote de n'importe quel server ou est le bot",
  cooldown: 10,
  usage: "<emoji>",
  permissions: false,
  args: true,
}
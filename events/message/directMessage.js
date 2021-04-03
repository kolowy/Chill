const { MessageEmbed} = require("discord.js");
const color = "BLUE";

module.exports = (client, message, settings) => {
  const user = message.author;
  if (user.bot) return;
  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${user.tag}'s MP :`, user.avatarURL())
    .setDescription(`${message.content}`)
    .setTimestamp()

  message.reply("Nous avons reçu votre ticket, nous vous répondrons dès que possible !")

  client.channels.cache.get('795388579798974486').send(embed);
};
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

  user.send("Nous avons reçu votre ticket, nous vous répondrons dès que possible !")
  client.channels.cache.find(channel => channel.name === client.config.logChannel).send(embed)
};
const { MessageEmbed } = require("discord.js");
const color = "RED";

module.exports = async (client, message) => {

  const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE"
  });

  const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
  const { executor } = latestMessageDeleted;

  const embed = new MessageEmbed()
    .setColor(color)
    .setDescription(`**Action :** supression d'un message\n**Message supprimé :** ${message.content}\n**Auteur du message :** ${message.author}`)
    .setTimestamp()
    .setFooter(executor.username, executor.avatarURL());

  client.channels.cache.find(channel => channel.name === '🔏┃logs').send(embed);
};
const { MessageEmbed } = require("discord.js");
const color = "RED";

module.exports = (client, guild) => {
   if (!guild.available) return;
  
  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${guild.owner.user.tag}\n(${guild.owner.user.id})`, guild.owner.user.displayAvatarURL())
		.setDescription(`Le BOT quitte ${guild.name} !`)
		.setTimestamp();

  client.channels.cache.get(client.config.goodbayChannel).send(embed);
};
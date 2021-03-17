const { MessageEmbed } = require("discord.js");
const color = "RED";

module.exports = (client, member, message) => {

  const guild = member.guild;

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${member.displayName}\n(${member.id})`, member.user.displayAvatarURL())
    .setDescription(`Au-revoir à ${member.user} !\nIl quitte ${guild.name} !`)
		.setTimestamp();

  client.channels.cache.get(client.config.goodbayChannel).send(embed);
};
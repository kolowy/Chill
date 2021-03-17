const { MessageEmbed } = require("discord.js");
const color = "GREEN";

module.exports = (client, guild) => {

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${guild.owner.user.tag}\n(${guild.owner.user.id})`, guild.owner.user.displayAvatarURL())
    .setDescription(`Le BOT débarque sur ${guild.name} !`)
		.setTimestamp();

  client.channels.cache.get(client.config.welcomeChannel).send(embed);
};
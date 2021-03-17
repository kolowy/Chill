const { MessageEmbed } = require("discord.js");
const color = "GREEN";

module.exports = (client, member, message) => {

  const guild = member.guild;

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${member.displayName}\n(${member.id})`, member.user.displayAvatarURL())
    .setDescription(`Bienvenue à ${member.user} !\nIl débarque sur ${guild.name} !`)
		.setTimestamp();

  client.channels.cache.get(client.config.welcomeChannel).send(embed);
};
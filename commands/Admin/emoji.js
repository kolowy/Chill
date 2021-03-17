const { MessageEmbed } = require("discord.js");

exports.run = (client, message) => {
	list = []
	message.guild.emojis.cache.forEach(e => list.push(e));

};

module.exports.help = {
    name: "emojis",
	aliases: ["emolist"],
	category: "admin",
	description: "Renvoit la liste des émojis du serveur.",
	cooldown: 10,
	usage: "",
	permissions: true,
	args: false,
}
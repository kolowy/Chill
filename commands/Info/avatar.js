const { MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {
  const mentionned = message.mentions.users.first();

  if (mentionned) {
    var user = mentionned;
  } else {
    var user = message.author;
  }

		let image = user.displayAvatarURL({format: 'png', dynamic: 'true', size: 2048});

  const embed = new MessageEmbed()
    .setAuthor(user.username, user.avatarURL())
    .setImage(image)
    .setDescription(`Requête de ${message.author}`)
    .setColor("GREEN");

  message.channel.send(embed);
};

module.exports.help = {
  name: "avatar",
  aliases: ["pp"],
  category: "info",
  description: "Renvoit une photo de profil discord.",
  cooldown: 10,
  usage: "<null>/<@user>",
  permissions: false,
  args: false,
}

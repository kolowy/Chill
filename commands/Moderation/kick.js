const { MessageEmbed } = require("discord.js");
const color = "BLUE";

module.exports.run = (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`${message.author} - Vous devez avoir la permission **\`KICK_MEMBERS\`** pour utiliser la commande .**\`kick\`**`);

  const user = message.mentions.users.first();
  const reason = args.splice(1).join(" ") || "Aucune raison spécifiée...";
  user ? message.guild.member(user).kick(reason) : message.channel.send("L'utiisateur n'existe pas !")

  const embed = new MessageEmbed()
  .setColor(color)
  .setAuthor(`${user.username}\n(${user.id})`, user.displayAvatarURL())
  .setDescription(`**Action :** \`KICK\`\n**Raison :** \`${reason}\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(client.config.logChannel).send(embed);
};

module.exports.help = {
  name: "kick",
  aliases: ["expulser"],
  category: "moderation",
  description: "Expulse un utilisateur.",
  cooldown: 10,
  usage: "<@user> <raison>",
  permissions: false,
  args: true,
}
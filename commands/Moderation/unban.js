const { MessageEmbed} = require("discord.js");
const color = "GREEN";

module.exports.run = async (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`${message.author} - Vous devez avoir la permission **\`BAN_MEMBERS\`** pour utiliser la commande .**\`unban\`**`);

  const user = await client.users.fetch(args[0]);
  if (!user) return message.reply("L'utilisateur n'existe pas !");
  message.guild.members.unban(user)

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
    .setDescription(`**Action :** \`UNBAN\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get(client.config.logChannel).send(embed);
};

module.exports.help = {
  name: "unban",
  aliases: ["deban"],
  category: "moderation",
  description: "Dé-bannit un utilisateur.",
  cooldown: 10,
  usage: "<id_user>",
  permissions: false,
  args: true,
}
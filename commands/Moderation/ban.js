const { MessageEmbed} = require("discord.js");
const color = "RED";

module.exports.run = (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`${message.author} - Vous devez avoir la permission **\`BAN_MEMBERS\`** pour utiliser la commande .**\`ban\`**`);

  
  const user = message.mentions.users.first();
  const reason = args.splice(1).join(" ") || "Aucune raison spécifiée...";

  if(user){
    message.guild.member(user).ban({ days: 7, reason: reason })
    .then(() => {
      const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
        .setDescription(`**Action :** \`BAN\`\n**ERROR** \`\``)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
      message.channel.send(embed);
    }).catch(err => {
      const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor("Refus de bannissement", user.avatarURL())
        .setDescription(`Vous n'avez pas la permission suffisante pour ban ${user.username}. \n(Id: ${user.id})`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
      message.channel.send(embed);
    });
  } else{
      const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor("Refus de bannissement", user.avatarURL())
        .setDescription(`Merci de mettre en 1er argument la mention de l'utilisateur a ban.`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
      message.channel.send(embed);
  }
};
module.exports.help = {
  name: "ban",
  aliases: ["bannir"],
  category: "moderation",
  description: "Bannit un utilisateur.",
  cooldown: 10,
  usage: "<@user> <raison>",
  permissions: false,
  args: true,
}
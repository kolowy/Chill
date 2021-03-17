const { MessageEmbed } = require("discord.js");
const color = "BLUE";

module.exports.run = async (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`${message.author} - Vous devez avoir la permission **\`MANAGE_MESSAGES\`** pour utiliser la commande .**\`prune\`**`);

  let user = message.guild.member(message.mentions.users.first());
  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply("Il faut spécifier un **nombre** entre 1 et 100 !")
  
  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length); 
  
  if (messages.length === 0 || !user) return message.reply("Aucuns messages à supprimer pour cet utilisateur (ou celui-ci n'existe pas) !")

  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
    .setDescription(`**Action :** \`PRUNE\`\n**Nbr de messages :** \`${args[1]}\`\n**Utilisateur :** \`${args[0]}\`\n**Salon :** \`${message.channel}\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get(client.config.logChannel).send(embed);
};

module.exports.help = {
  name: "prune",
  aliases: ["clearuser"],
  category: "moderation",
  description: "Supprime un nombre de message spécifique d'un utilisateur.",
  cooldown: 10,
  usage: "<@user> <nbr_msg>",
  permissions: false,
  args: true,
}
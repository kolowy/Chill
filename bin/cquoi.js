//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Vous devez avoir la permission** `ADMINISTRATOR` **pour exécuter cette commande !**");

  let user = message.guild.member(message.mentions.users.first());
  if (isNaN(args[0]) || (args[0] < 1 || args[0] < 100)) return message.reply('Il faut spécifier un **nombre** entre \`1\` et \`100\` !');

  const messages = await message.channel.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  }).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user) return message.reply("Aucuns messages à supprimer pour cet utilisateur ou alors il n'existe pas...")

  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
	  .setColor("RED")
	  .setAuthor(message.author.username, message.author.avatarURL())
	  .setDescription(`**Action** : PURGE\**Nbr de messages** : ${args[0]}\**Salon** : ${message.channel}`)
	  //.setThumbnail(imageclear)

  client.channels.cache.find(channel => channel.name === '🔏┃logs').send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.MUTE;
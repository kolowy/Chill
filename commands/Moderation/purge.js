const { MessageEmbed} = require("discord.js");
const color = "BLUE";

module.exports.run = async (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`${message.author} - Vous devez avoir la permission **\`MANAGE_MESSAGES\`** pour utiliser la commande .**\`purge\`**`);

  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply("Il faut spécifier un **nombre** entre 1 et 100 !")
  
  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id
  });
  
  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
    .setDescription(`**Action :** \`PURGE\`\n**Nbr de messages :** \`${args[0]}\`\n**Salon :** \`${message.channel}\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get(client.config.logChannel).send(embed);
};

module.exports.help = {
  name: "purge",
  aliases: ["clear"],
  category: "moderation",
  description: "Supprime un nombre de message spécifique.",
  cooldown: 10,
  usage: "<nbr_msg>",
  permissions: false,
  args: true,
}
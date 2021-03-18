const { MessageEmbed } = require("discord.js");
const color = "RED";

module.exports.run = async (client, message, args, level, settings) => {
  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`${message.author} - Vous devez avoir la permission **\`MANAGE_MESSAGES\`** pour utiliser la commande **\`purge\`**.`)
			.then(msg => {
      msg.delete({ timeout: 5000 });
   });

	if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply("Il faut spécifier un **nombre** entre 1 et 100 !")
		.then(msg => {
      msg.delete({ timeout: 5000 });
   });
  
  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id
  });
  
  await message.channel.bulkDelete(messages).catch(err => {
	message.channel.reply("Vous n'avez pas la permission suffisante pour supprimer ces messages.")
		.then(msg => {
      msg.delete({ timeout: 5000 });
    });
	});;

	message.channel.send(`\`${args[0]}\` messages ont été supprimés !`)
		.then(msg => {
      msg.delete({ timeout: 10000 });
    });

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${message.author.username}\n(${message.author.id})`, message.author.avatarURL())
    .setDescription(`**Action :** \`PURGE\`\n**Nbr de messages :** \`${args[0]}\`\n**Salon :** \`${message.channel}\``)
    .setTimestamp()

  client.channels.cache.get(client.config.logChannel).send(embed)
};
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

const { MessageEmbed} = require("discord.js");
const ms = require("ms");
const color = "RED";

module.exports.run = async (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${message.author} - Vous devez avoir la permission **\`ADMINISTRATOR\`** pour utiliser la commande .**\`mute\`**`);

  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === "muted");
  let muteTime = (args[1] || "60s")
  const reason = args.splice(2).join(" ") || "Aucune raison spécifiée...";

  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      name: "Muted",
      color: "#000",
      permissions: []
    })
  };

  message.guild.channels.cache.forEach(async (channel, id) => {
    await channel.updateOverwrite(muteRole, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false
    });
  });

  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> a été randus muet pour une durée de ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms (muteTime));

  const embed = new MessageEmbed()
  .setColor(color)
  .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
  .setDescription(`**Action :** \`MUTE\`\n**Temps :** \`${ms(ms(muteTime))}\`\n**Raison :** \`${reason}\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(client.config.logChannel).send(embed);
};

module.exports.help = {
  name: "mute",
  aliases: ["taire"],
  category: "moderation",
  description: "Enlève le droit de parole à un utilisateur.",
  cooldown: 10,
  usage: "<@user> <time> <raison>",
  permissions: false,
  args: true,
}
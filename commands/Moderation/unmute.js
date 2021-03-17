const { MessageEmbed} = require("discord.js");
const color = "GREEN";

module.exports.run = async (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${message.author} - Vous devez avoir la permission **\`ADMINISTRATOR\`** pour utiliser la commande .**\`unmute\`**`);

  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === "muted");

  if (!user.roles.cache.as(muteRole.id)) return message.reply("L'utilisateur mentionné n'est pas mute !")
  await user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus mute !`);

  const embed = new MessageEmbed()
  .setColor(color)
  .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
  .setDescription(`**Action :** \`UNMUTE\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(client.config.logChannel).send(embed);
};

module.exports.help = {
  name: "unmute",
  aliases: ["demute"],
  category: "moderation",
  description: "Rends le droit de parole à un utilisateur.",
  cooldown: 10,
  usage: "<@user>",
  permissions: false,
  args: true,
}
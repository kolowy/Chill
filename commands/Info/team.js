const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message) => {
	message.delete({ timeout: 1000 });

  linkId = client.user.id
  linkAvatar = client.user.avatar
  avatar = "https://cdn.discordapp.com/avatars/"+linkId+"/"+linkAvatar+".png"

  //["XDemon🌴", "Croux🍹","Kolowy👾" ]
  console.log("https://cdn.discordapp.com/avatars/"+linkId+"/"+linkAvatar+".png")
  const teamEmbed = new MessageEmbed()
   .setAuthor(client.user.username, client.user.avatarURL(), client.user.avatarURL())
  .setTitle(`:snake: I present to you the team :`)
  .setColor("DARK_GOLD")
  .addField("Kolowy👾", "He is not ready for code pools")
  .addField("Croux🍹", "He breaks the cmd")
  .addField("XDemon🌴", "He loves hamsters")
  .setFooter("By ＣＨＩＬＬ ➽ 🌞")
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp();
  message.channel.send(teamEmbed);
};

module.exports.help = {
  name: "team",
  aliases: ["ekip"],
  category: "info",
  description: "Présente la team.",
  cooldown: 10,
  usage: "<TEAM>",
  permissions: false,
  args: false,
}
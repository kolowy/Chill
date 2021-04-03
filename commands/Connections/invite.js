const { MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor("YELLOW")
    .setAuthor(client.user.username)
    .setTitle("__Pour ajouter le bot à votre serveur__ :")
    .setDescription("[inviter le bot sur votre serveur !](https://discord.com/api/oauth2/authorize?client_id=752812712165376083&permissions=8&scope=applications.commands%20bot)\n \n[Rejoindre notre serveur !](https://discord.gg/c4RvJUCBEW)\n")
    .setFooter("Invite", "https://images.emojiterra.com/google/android-11/128px/2795.png")
    .setTimestamp();
  message.channel.send(embed)
};

module.exports.help = {
  name: "invite",
  aliases: ["invitation"],
  category: "connections",
  description: "Renvoit le lien d'invitation du BOT.",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}

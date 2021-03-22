const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

  message.delete({ timeout: 1000 }).catch((error) => {
        message.channel.send('I cannot delete message here')
});

    const embed = new MessageEmbed()
      .setTitle(`\`${args[0]}\`'s body : `)
      .setImage('https://skins.nationsglory.fr/body/'+ args[0]+'/3d/15')  
      .setColor("#0474dc")
     .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");

    message.channel.send(embed)
};

module.exports.help = {
  name: "skin",
  aliases: ["corps"],
  category: "nationsglory",
  description: "Renvoit le corps d'un utilisateur.",
  cooldown: 10,
  usage: "<pseudo>",
  permissions: false,
  args: false,
}

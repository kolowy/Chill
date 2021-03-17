const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

  message.delete({ timeout: 1000 });

    const embed = new MessageEmbed()
      .setTitle(`\`${args[0]}\`'s body : `)
      .setImage('https://skins.nationsglory.fr/body/'+ args[0]+'/3d/15')  
      .setColor("#0474dc")
     .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");

    message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.SKIN;
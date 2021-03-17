const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {

  message.delete({ timeout: 1000 });

  var taille = args[1]
  if(!taille) {
  const ping = new MessageEmbed()
    .setTitle(`\`${args[0]}\`'s head :`)
    .setImage('https://skins.nationsglory.fr/face/'+ args[0] +'/3d/15')  
    .setColor("#0474dc")
    .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");

  message.channel.send(ping)
	
  } else {
      const ping = new MessageEmbed()
      	 .setTitle(`${args[0]}'s face `)
         .setImage('https://skins.nationsglory.fr/face/'+ args[0] +'/3d/' + args[1])  
      	 .setColor("#0474dc")
      	 .setDescription(`Si l'image n'apparait pas, reverifiez le pseudo que vous avez entré`)
         .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");

  message.channel.send(ping)
    }
};
module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.HEAD;
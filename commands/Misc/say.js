//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const ADMIN = process.env.ADMIN.split(',');
const color = "RANDOM";

module.exports.run = (client, message, args) => {
  message.delete({ timeout: 1000 });

//Définition de l'accès fermé
  let notAccess=true;
  for (let i = 0; i < ADMIN.length; i++) {
      if(ADMIN[i]==message.author.id){
        notAccess=false;
    }
  }

 	if(notAccess== true && args[2] !== "ano") {
		
  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${message.author.username} 🗣`, message.author.avatarURL(), message.author.avatarURL())
    .setDescription(args.join(" "));

  message.channel.send(embed);
	 
	} else if (args[2] === "ano") {
	const embed = new MessageEmbed()
    .setColor(color)
    .setDescription(args.splice(1).join(" "));

  message.channel.send(embed); 
	};
};

module.exports.help = MESSAGES.COMMANDS.MISC.SAY;
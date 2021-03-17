const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js")
const fs = require("fs");
let categoryList = fs.readdirSync("./commands");
const categoryHelp = require('../../util/categoryHelp.json');
const color = "RANDOM";
const ADMIN = process.env.ADMIN.split(',');

module.exports.run = (client, message, args) => {
message.delete({ timeout: 1000 });
let notAccess=true;
  for (let i = 0; i < ADMIN.length; i++) {
      if(ADMIN[i]==message.author.id){
        notAccess=false;
    }
  }
console.log(MESSAGES)

if (!args.length) {
  let listCat=[];
  categoryList = categoryList.filter(item => item != "Fondateur");
  if((categoryList.length)==Object.keys(categoryHelp).length ){
    listCat = Object.values(categoryHelp);
  }
  else {
    listCat = categoryList;
    console.log("Help : Json à mettre à jour")
  }
		
  const embed = new MessageEmbed()
    .setColor(color)
    .addField('Liste des commandes', ` ⁢⁢⁢⁢⁢\nUne liste de toutes les sous-catégories disponibles et leurs commandes\n ⁢⁢⁢⁢Pour plus d\'informations, tapez \`${client.config.PREFIX}help <commande_name>\`\n ⁢⁢⁢⁢⁢`)
  console.table(categoryList);

  /*if(notAccess==false ){
    console.log("u are admin");
    console.log("")

    embed.addField(`🛃 >> Fondateur`,
    `${client.commands.filter(cat => cat.help.category == "fondateur").map(cmd => cmd.help.name).join(', ')}`);
  }*/

  for (var i= 0; i < categoryList.length; i++){
    if(categoryList[i]!="fondateur"){
    embed.addField(
      `${listCat[i]}`,
      `${client.commands.filter(cat => cat.help.category === categoryList[i].toLowerCase()).map(cmd => cmd.help.name).join(', ')}`);
    }
  }
  if(notAccess==false ){
    return message.author.send(embed);
  }else{
    return message.channel.send(embed);
  }
 
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

  if (!command) return message.reply("Cette commande n'existe pas !")

    const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setTitle(`\`${command.help.name}\``)
    .addField("Description", `${command.help.description}`)
    .addField("Utilisation", command.help.usage ? `${client.config.PREFIX}${command.help.name} ${command.help.usage}` : `${client.config.PREFIX}${command.help.name} `, true)
		.addField("Cooldown", `${command.help.cooldown}`, true)


  if (command.help.aliases.length > 0){
   embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
  }
  console.log(command.help.category)
  if((command.help.category == "fondateur")&& (notAccess==false)){
    return message.author.send(embed);
  }else{
    if(command.help.category != "fondateur"){
      return message.channel.send(embed);
    }else{
      return message.channel.send("Commande Fondateur innaccessible pour vous.");
    }
  }
	};
};

module.exports.help = MESSAGES.COMMANDS.MISC.HELP2;
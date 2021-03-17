//Kolowy
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = (client, message, args) => {

  message.delete({ timeout: 1000 });

  const Serveur = args[0]
  if(Serveur == "blue" || Serveur == "black" ){
  a = 1
} else {
  message.channel.send(`Le serveur ${Serveur} n'existe pas... Je ne connais que le **Blue** et l'**Orange**`)
return
}

//Pays
  const liste_pays = ally.get(`${message.guild.id}.${Serveur}PAYS`);
  var liste_pays_well = ``
  var x = liste_pays.length
  for(let i = 0; i < x; i++) {
  liste_pays_well = `${liste_pays_well} \n :white_small_square:  ${liste_pays[i]}`
}

//Emp
  const liste_Emp = ally.get(`${message.guild.id}.${Serveur}EMP`);
  liste_Emp.sort()
  var liste_Emp_well = ``

  for(let i = 0; i < liste_Emp.length; i++) {
  liste_Emp_well = `${liste_Emp_well} \n :white_small_square: Empire ${liste_Emp[i]}`
}

//Embed
  const embed = new MessageEmbed()
	 .setTitle(`Liste des pays du ${Serveur}`, message.guild.iconURL)
	 .setDescription(`👑▫Empires :\n${liste_Emp_well}\n\n\n⚜▫Pays :\n${liste_pays_well}\n\n`)  
	 .setColor("#0474dc")
         .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");
	 
message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.COUNTRYLIST;
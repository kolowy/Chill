//Kolowy
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const Enmap = require("enmap");

module.exports.run = async(client, message, args) => {

  message.delete({ timeout: 1000 });

  const Serveur = args[0].toLowerCase()
  if(Serveur == "blue" || Serveur == "black"){
    a = 1
  } else {
      message.channel.send(`Le serveur ${Serveur} n'existe pas... Je ne connais que le **Blue** et l'**Orange**`)
      return
  }
  const Pays = args[1].toString()
  let pays_serv = pays.get(`${message.guild.id}-${Serveur}`, `Pays`);
  let emp_serv = pays.get(`${message.guild.id}-${Serveur}`, `Emp`);


  if(pays_serv.includes(`${Pays}`) || emp_serv.includes(`${Pays}`)){
    const embed = new MessageEmbed()
    .setTitle(`Milice`, message.guild.iconURL)
    .setDescription(`Le pays ${Pays} appartient aux alliés sur le serveur ${Serveur}`)  
    .setColor("#0474dc")
    .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");
    message.channel.send(embed)
  } else {
    var embed = new Discord.MessageEmbed()
    .setTitle(`Liste des pays alliés du ${Serveur}`, message.guild.iconURL)
    .setDescription(`Le pays ${Pays} **n'est pas** dans les alliés du serveur ${Serveur}`)  
    .setColor("#0474dc")
    .setFooter("Extract to NG Blue ©", "https://cdn.discordapp.com/attachments/707987149013778484/781226919953825854/Blue2.jpg");

  message.channel.send(embed)
  }
};

module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.COUNTRYSEARCH;
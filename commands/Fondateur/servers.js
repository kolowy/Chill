const { MessageEmbed} = require("discord.js");
const ADMIN = process.env.ADMIN.split(',');

module.exports.run = async (client, message, args) => {
  let notAccess=true;
  for (let i = 0; i < ADMIN.length; i++) {
      if(ADMIN[i]==message.author.id){
        notAccess=false;
    }
  }

 	if(notAccess== false) {
  message.delete({ timeout: 1000 });

  let lstServer = "";
  let count=0;

  if(!args[0]){
    client.guilds.cache.forEach((server) => {
      const chan = server.channels.cache.find(
          (channel) => channel.type === "text"
      );
      count++;
      lstServer += server.name+"\n";
    })
    lstServer = lstServer.substring(0, lstServer.length-2)
    const embed = new MessageEmbed()
    .setTitle("Le bot est sur les "+count+" serveurs:")
      .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
      .setColor("GREEN");

      //console.table(lstServer.length, lstServer)
    for(let i=0;i<lstServer.length;i++){
      embed.setDescription(lstServer)
    }
    //message.channel.send(embed);
client.users.cache.get(message.author.id).send(embed);
    }
   }
   else{
     const embed = new MessageEmbed()
    .setTitle("Vous n'etes pas fondateurs et donc vous n'avez pas accès à cette commande !")
      .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
      .setColor("GREEN");
          message.channel.send(embed);
   }
}

module.exports.help = {
  name: "servers",
  aliases: ["servers"],
  category: "fondateur",
  description: "Renvoit la liste des serveurs sur lesquels est le BOT.",
  cooldown: 0,
  usage: "",
  permissions: false,
  args: false,
}
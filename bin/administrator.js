//XDemon
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } =  require("discord.js")
const ownerId = process.env.OWNERID.split(",");


module.exports.run = (client, message, args) => {
  let notAccess=true;
  for (let i = 0; i < ownerId.length; i++) {
    console.log(ownerId[i],message.author.id)
      if(ownerId[i]==message.author.id){
        notAccess=false;
    }
  }

if(notAccess== true){
      return message.reply("**Seuls les fondateurs du `BOT` peuvent exécuter cette commande !**");
  }

client.guilds.cache.forEach((server) => {
            if(server.id == "750046207551864944"){
              server.roles.cache.find(role => role.name=="Cobra" ? message.send("corbra is admin in "+server.name) : "")
            }
});


};

module.exports.help = MESSAGES.COMMANDS.ADMIN.ADMINISTRATOR;  
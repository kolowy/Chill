const { MessageEmbed } = require("discord.js")
const color = "RED";
const ADMIN = process.env.ADMIN.split(',');
/*test
const { MessageAttachment } = require('discord.js')
const nodeHtmlToImage = require('node-html-to-image')
*/
module.exports.run = async (client, message, args) => {
  let notAccess=true;
  let id="";
  for (let i = 0; i < ADMIN.length; i++) {
      if(ADMIN[i]==message.author.id){
        notAccess=false;
    }
  }

  return msg.channel
    .send(new MessageAttachment(images, `${name}.jpeg`))



  await message.delete({ timeout: 1000 });
  nameServer= args.join(" ");
  console.log(nameServer)
  id = client.guilds.cache.filter(g => g.name == nameServer).map(u => u.id);
  console.log(id[0]);

console.log(id.length)
  if(id.length==0){
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setColor(color)
    .setTitle("❌ server not found")
    .setTimestamp();
    message.channel.send(embed)  

  }else{

  if(notAccess==false){
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setColor(color)
    .setTitle("BOT LEAVE !" +id+" ❌")
    .setTimestamp();

  message.channel.send(embed)  
    client.guilds.cache.get(id[0]).leave().catch(err => {
      console.log(`there was an error leaving the guild: `+id);
  })
  }
  }
};
module.exports.help = {
  name: "bye",
  aliases: ["servers"],
  category: "fondateur",
  description: "Leave le serveur mentionné.",
  cooldown: 0,
  usage: "",
  permissions: false,
  args: true,
}
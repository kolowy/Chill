exports.run = (client, message, args) => {
    message.channel.send("Croux développe cette commande... patience !")
};
  
module.exports.help = {
    name: "reload",
    aliases: ["rc"],
    category: "admin",
    description: "Actualise une cmd.",
    cooldown: 10,
    usage: "<command_name>",
    permissions: true,
    args: true,
}
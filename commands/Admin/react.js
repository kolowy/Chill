module.exports.run = (client, message, args) => {
    message.delete({ timeout: 1000 });
   
    client.channels.cache.get(args[0]).messages.fetch(args[1]).then(function (message) {
      message.react(args[2])
    });
};

  
module.exports.help = {
    name: "react",
    aliases: ["réagir"],
    category: "admin",
    description: "Réagit à un message",
    cooldown: 10,
    usage: "<channel_id> <message_id> <emoji>",
    permissions: true,
    args: true,
}

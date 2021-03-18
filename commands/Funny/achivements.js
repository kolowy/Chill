module.exports.run = (client, message, args) => {
    message.delete({ timeout: 1000 }).catch((error) => {
        message.channel.send('I cannot delete message here')
    });
    msg = args.join("..").toLowerCase()
    message.channel.send('https://minecraft-api.com/api/achivements/grass/' + msg )
};

module.exports.help = {
  name: "achivements",
  aliases: ["achi"],
  category: "funny",
  description: "Renvoi votre message sous forme d'achivement minecraft",
  cooldown: 10,
  usage: "<title>/<message>",
  permissions: false,
  args: true,
}

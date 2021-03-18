module.exports.run = (client, message, args) => {
  message.delete({ timeout: 1000 }).catch((error) => {
    message.channel.send('I cannot delete message here')
  });
  const ayy = client.emojis.cache.find(emoji => emoji.name === args[0]);
  message.channel.send(`${ayy}`);
};

module.exports.help = {
  name: "emote",
  aliases: ["e", "emo"],
  category: "funny",
  description: "Renvoi un emote de n'importe quel server ou est le bot",
  cooldown: 10,
  usage: "<emoji>",
  permissions: false,
  args: true,
}

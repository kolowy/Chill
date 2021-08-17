const { codeBlock } = require("@discordjs/builders");


module.exports.run = async (client, message, args) => {
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(codeBlock("js", clean));
  } catch (err) {
    message.channel.send(codeBlock("xl", `ERROR ${await client.clean(client, err)}`));
  }
};

module.exports.help = {
  name: "eval",
  aliases: [""],
  category: "Fondateur",
  description: "Évalue du code JS..",
  cooldown: 10,
  usage: "",
  permissions: false,
  args: false,
}

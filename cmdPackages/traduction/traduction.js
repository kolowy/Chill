//XDemon
const translate = require("@vitalets/google-translate-api");
const { MessageEmbed } = require("discord.js");

module.exports = {
	
  trad: function(message, client) {

    try{
      let chanName = message.channel.name;
      let messUser = message.author.username;
      let langage = null;
      let lang = null;
      let server = message.guild;
      let catLang;
      mylang = chanName.substring(chanName.length - 2, chanName.length);

      if (mylang == "en") {
        langage = "french";
        lang = "send the message in english";
        catLang = "fr";
        catlangFrom = "en";
      } else if (mylang == "fr") {
        langage = "english";
        lang = "a envoyé le message en français";
        catlangFrom = "fr";
        }

        chanName = chanName.substring(0, chanName.length - 2) + catLang;

        let chanServer = server.channels.cache.find(
          (c) => c.name == chanName && c.type == "text"
        );

        if (!chanServer) {
          return;
        }

        //let text = message.content.substring(1, message.content.length);
        text = message.content;

        translate(text, {
          to: translate.languages.getCode(langage),
          from: catlangFrom,

        }).then((res) => {
          console.log("test : " + res.text);
          text = res.text.replace("<@! ", "<@!");
          text = text.replace("<@ ", "<@!");
          text = text.replace("<# ", "<#");
          text = text.replace(" @!>", "@!>");

          let image = message.author.displayAvatarURL();
          var embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(messUser + " " + lang + ": ")
            .setAuthor(messUser, image)
            .setDescription(text);

          client.channels.cache.get(chanServer.id).send(embed);
        })}
      catch(e) {
    }
  }
};
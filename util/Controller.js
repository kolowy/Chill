const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js'); 
let out = true
//const emoji = require('./emoji');
var actualPlayer =0
let player = ""

class Controller {
    constructor(bot, emoji, user, out) {
        this.bot = bot;
        this.user = user
        this.out = out
    }
    async draw(message, msg, partie, emoji, controller, i) {
        this.player = this.user[i %2]
        let text = partie.toString(emoji);
        const filter = (reaction, user) => {
            return emoji.all.includes(reaction.emoji.name) && (user.id == this.player);
        }
        const embed = new MessageEmbed()
            .setTitle(`Puissance 4`)
            .setColor("BLUE")
            .setDescription("Au tour de **" + this.player.username +  "** \n\n" + text )
        msg.edit(embed);
        return msg.awaitReactions(filter, { max: 1 }).then(collected => {
            const reaction = collected.first();
            reaction.users.remove(this.player);
            switch (reaction.emoji.name) {
                case emoji[1]:
                    return partie.playAt(1, message, controller);
                case emoji[2]:
                    return partie.playAt(2, message, controller);
                case emoji[3]:
                    return partie.playAt(3, message, controller);
                case emoji[4]:
                    return partie.playAt(4, message, controller);
                case emoji[5]:
                    return partie.playAt(5, message, controller);
                case emoji[6]:
                    return partie.playAt(6, message, controller);
                case emoji[7]:
                    return partie.playAt(7, message, controller);
                default:
                    break;
            }

        }).catch(collected => {
            console.log(collected);
            console.log("other");
        })
    }
    win(){
        return this.out;
    }
    haswin(){
        this.out = false
    }
    playerwin(msg, partie, emoji, i){
        this.player = this.user[i %2]
        let text = partie.toString(emoji);
        msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        const embed = new MessageEmbed()
            .setTitle(`Puissance 4`)
            .setColor("BLUE")
            .setDescription("**" + this.player.username +  " a gagné !** \n\n" + text )
        msg.edit(embed);
    }
}
module.exports = Controller;
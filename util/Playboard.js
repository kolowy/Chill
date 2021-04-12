const Colonne = require("./colones");
///const Emoji = require('./emoji');
const Win = require('../commands/Connections/puissance4');

class Playboard {

    constructor(emoji) {
        this.colonnes = [
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne(),
            new Colonne()
        ];
        const Emoji = emoji
        this.possibleEmoji = [
            Emoji.circle.red,
            Emoji.circle.yellow
        ]
        this.actualEmoji = 0;
    }

    playAt(nbColonne, message, controller) {
        const col = this.colonnes[nbColonne -1];
        const canPlay = !(col.isFull());
        if (canPlay) {
            col.addPion(this.possibleEmoji[this.actualEmoji]);
            let count = 0;
            //TODO ligne à mettre function
            for (let j = 0; j < 7; j++) {
                const colonnes = this.colonnes[j];
                var pion = colonnes.pion()
                let row = col.pion().length
                count = ( pion[row -1] == '<:' + this.possibleEmoji[this.actualEmoji].name + ':' + this.possibleEmoji[this.actualEmoji].id + '>') ? count+1 : 0;
                if (count >= 4) { controller.haswin(); console.log("winnn"); return true; }
            }
            //TODO colone à mettre function
            count = 0;
            if(col.pion().length>3){
                for (let j = (col.pion().length -4); j < col.pion().length; j++) {
                    var pion = col.pion()
                    count = ( pion[j] == '<:' + this.possibleEmoji[this.actualEmoji].name + ':' + this.possibleEmoji[this.actualEmoji].id + '>') ? count+1 : 0;
                    if (count >= 4) { controller.haswin(); console.log("winnn"); return true; }
                }
            }
            //TODO diago à mettre function
            count = 0;
            let row = col.pion().length
            for (let j = -4; j < 3; j++) {
                if (nbColonne + j < 0 || nbColonne + j> 6) {
                    continue;
                }
                const colonnes = this.colonnes[nbColonne + j];
                var pion = colonnes.pion()
                count = ( pion[row +j] == '<:' + this.possibleEmoji[this.actualEmoji].name + ':' + this.possibleEmoji[this.actualEmoji].id + '>') ? count+1 : 0;
                if (count >= 4) { controller.haswin(); console.log("winnn"); return true; }
            }
            //TODO antidiago à mettre function
            count = 0;
            row = col.pion().length
            for (let j = -3; j < 5; j++) {
                if (nbColonne - j < 0 || nbColonne - j> 6) {
                    continue;
                }
                const colonnes = this.colonnes[nbColonne - j];
                var pion = colonnes.pion()
                count = ( pion[(row +j-2)] == '<:' + this.possibleEmoji[this.actualEmoji].name + ':' + this.possibleEmoji[this.actualEmoji].id + '>') ? count+1 : 0;
                if (count >= 4) { controller.haswin(); console.log("winnn"); return true; }
            }
            this.actualEmoji++;
            this.actualEmoji = this.actualEmoji %2;
        } else {
            message.channel.send("Colonne pleine").delete({ timeout: 1000 }).catch((error) => {
                message.channel.send('I cannot delete message here')
            });
        }
    }

    toString(Emoji) {
        let text = Emoji[1] + Emoji[2] + Emoji[3] + Emoji[4] + Emoji[5] + Emoji[6] + Emoji[7] + "\n \n \n";
        for (let i = 6 - 1; i >= 0; i--) {
            for (let j = 0; j < 7; j++) {
                if (this.colonnes[j].pions[i]) {
                    text += this.colonnes[j].pions[i];
                } else {
                    text += `${Emoji.circle.white}`;
                }
            }
            text += "\n";
        }
        //console.log(text);

        return text;
    }
}

module.exports = Playboard;
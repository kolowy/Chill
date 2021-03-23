const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const guildSchema = new Schema({
    guildId: {
        type: String
    },
    prefix: {
        type: String
    }
}, {
    timestamps: true
});

let GuildDiscord = mongoose.model("GuildDiscord", guildSchema);
module.exports = GuildDiscord;
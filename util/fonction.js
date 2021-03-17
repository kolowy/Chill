module.exports = {
    getMember: function(message, args) {
        let target = message.member;
        if (args[0]) target = message.guild.member(message.mentions.users.first());
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    }
}
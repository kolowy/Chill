const ADMIN = process.env.ADMIN.split(',');

module.exports.run = (client, message, args, member) => {
	message.delete({ timeout: 1000 });
	  let notAccess=true;
  for (let i = 0; i < ADMIN.length; i++) {
      if(ADMIN[i]==message.author.id){
        notAccess=false;
    }
  }

	message.guild.members.cache.forEach(member => {
		if (args) {
			member.setNickname(args.join(" "));
		} else {
		member.setNickname("");
		}
	})
};

module.exports.help = {
    name: "nicks",
	aliases: ["resetnicks"],
	category: "fondateur",
	description: "Reset les pseudos de tous les joueurs sur le serveur.",
	cooldown: 10,
	usage: "",
	permissions: true,
	args: false,
}
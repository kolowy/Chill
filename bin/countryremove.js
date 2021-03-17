//Kolowy
const { MESSAGES } = require("../../util/constants");
const { Enmap } = require("enmap");

module.exports.run = (client, message, args) => {

  message.delete({ timeout: 1000 });

  const Serveur = args[0].toLowerCase()
  if(Serveur == "blue" || Serveur == "black"){
  a = 1
} else {
  message.channel.send(`Le serveur ${Serveur} n'existe pas... Je ne connais que le **Blue** et l'**Orange**`)
return
}

  const Pays = args[1].toString()
  let pays_serv = pays.get(`${Serveur}`, `Pays`);
  let emp_serv = pays.get(`${Serveur}`, `Emp`);
  if(pays_serv.includes(`${Pays}`)) {
  pays.remove(`${Serveur}`, `${Pays}`, `Pays`);
  message.channel.send(`Le pays ${Pays} du serveur ${Serveur} n'apprartient plus aux alliés :open_mouth:`);

} else
  if(emp_serv.includes(`${Pays}`)) {
  pays.remove(`${Serveur}`, `${Pays}`, `Emp`);
  message.channel.send(`Le pays ${Pays} du serveur ${Serveur} n'apprartient plus a la milice :open_mouth:`);

} else {
  message.channel.send(`Il n'existe aucun pays de ce nom`)
}
};


module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.COUNTRYREMOVE;
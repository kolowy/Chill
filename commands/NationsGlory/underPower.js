const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
var dateFormat = require("dateformat");
fs = require('fs');
var now = new Date();
const today = dateFormat(now, "HH-MM_dd-mm-yyyy");
const todayH = today.replace("-", "h");


module.exports.run = async(client, message, args) => {
	message.delete({ timeout: 1000 });

	message.channel.send(`${message.author} - Cette commande est en dévelloppment !`)

//puppeteer.use(StealthPlugin())
/*
  await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {

//puppeteer.launch({ headless: true }).then(async browser => {
    console.log('✷ Running browser..')
    const page = await browser.newPage()
    await page.goto('https://nationsglory.fr/server/blue/countries', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    })
    await page.waitForTimeout(5500)
    const hrefs = await page.$$eval("tr > td > a", (list) => list.map((elm) => elm.href));
    const links = [];
    let message = "";
    hrefs.forEach(hf => {
        if (hf.startsWith('https://nationsglory.fr/country/blue/') == true) {
            links.push(hf)
        }
    });
    const linkLength = links.length / 2;
    for (let i = 0; i < linkLength; i++) {
        let pay = links[i].substring(37, links[i].length)

        await page.goto(links[i]), {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        };
        await page.waitForTimeout(5500);
        const claims = await page.evaluate(() => Array.from(document.querySelectorAll(".mb-2"), element => element.textContent));
        const powers = await page.evaluate(() => Array.from(document.querySelectorAll(".col-md-3 > .mb-2"), element => element.textContent));
        const members = await page.evaluate(() => Array.from(document.querySelectorAll(".pl-4 > a > div"), element => element.textContent));

        let level = claims[2];
        let power = powers[1].split("/");
        let claim = claims[4];
        power = parseInt(power[0], 10)
        claim = parseInt(claim, 10)
        console.log("n°" + i + " ☛\t Country: " + pay + "\t♝ level: " + level)

        if (power < claim) {
            console.log("n°" + i + pay + " → ♝ level: " + level + " → ♚ power: " + power, " → ♛ claim: " + claim + " → ♟members: " + "\n" + "members: " + members + "\n")
            message = "🌐" + pay + "\t⌛️level: " + level + "\t→ 💪🏼power: " + power + "\t📍claim: " + claim + "\t🔗link : " + links[i] + "\n" + "members: " + members + "\n";
            fs.appendFile('underPower/results👨🏼‍💻' + todayH + '.txt', message, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        }
    }
    await browser.close()
    console.log("✨All done, check the console✨");
})*/
};

module.exports.help = MESSAGES.COMMANDS.NATIONSGLORY.UNDERPOWER;
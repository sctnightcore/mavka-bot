const Discord = require('discord.js');
const fs = require("fs");

const bot = new Discord.Client();
var config = require('./config.json');
const prefix = config.prefix;

// Create collection to store commands
bot.commands = new Discord.Collection();

// Get list all file in commands directory
fs.readdir("./commands/", (err, files) => {
	if (err) throw err;

	// Get all file js in commands directory
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) throw "Connot find js file in commands directory!"

    console.log(`Loading ${jsfiles.length} commands!`);
	
	// Loop foreach file commands
    jsfiles.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.command.name, props);

    });
});



bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
    if(message.author.bot) return;

    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");

    let command = messageArray[0];

    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));

    let authorID = message.author.id;
    // let botID = bot.user.id;

    if (cmd) {
    	cmd.run(bot, message, args, authorID);
    }

});

bot.login(config.token);

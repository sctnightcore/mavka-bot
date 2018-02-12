const Discord = require('discord.js');
const npcs = require('../json/npcs.json');
const locations = require('../json/equip_locations.json');

module.exports.run = async(bot, message, args, authorID, botID) => {
	let npc = npcs[Math.floor(Math.random() * npcs.length)];
	// let npc = npcs[36];

	message.channel.send(`<@${authorID}>, đây là npc mà Mavka chọn được cho bạn :grimacing:\n`);
	let msgDescription = `ID:${npc.id}\n`;

	if (npc.meta.note) {
		msgDescription += `\t${npc.meta.note}\n`;
	}

	if (npc.meta.job) {
		msgDescription += "\t\`Job class`\n";
	}

	if (npc.meta.monster) {
		msgDescription += "\t`Monster`\n";
	}

	if (npc.meta.mercenary) {
		msgDescription += "\t`Mercenary`\n";
	}

	if (npc.meta.skill) {
		msgDescription += "\t`"+ skill +"`\n";
	}

	let embed = new Discord.RichEmbed()
		.setTitle(npc.name)
		.setColor("#1abc9c")
		.setURL(npc.image)		
		.setDescription(msgDescription);
	
	if (npc.meta.illust) {
		embed.setImage(npc.meta.illust).setThumbnail(npc.image);
	} else {
		embed.setImage(npc.image);		
	}

	message.channel.send({embed: embed});
}


module.exports.command = {
    name: "npc"
}

const Discord = require('discord.js');

module.exports.run = async(bot, message, args, authorID, botID) => {

	let msgDescription = "Chào <@"+authorID+">, mình là Mavka, thành viên **publicRO**.\n" +
						 "Mình có thể hỗ trợ bạn một số thông tin sau:\n" +
						 "\n" +
						 "`!help`: Thông tin về mình.\n" +
						 "\n" +
						 "**Tìm kiếm**\n" +
						 "*Monster*\n" +
						 "`!mobinfo <name/ID>`: Hiển thị thông tin monster.\n" +
						 "\t\t\t`!mi`, `!monster` Cũng có chức năng như vậy.\n" +
						 "`!monsters <name>` Tìm kiếm monster, trả về 3 kết quả đầu tiên.\n" +
						 "\n" +
						 "*Item*\n" +
						 "`!iteminfo <name/ID>`: Hiển thị thông tin item.\n" + 
						 "\t\t\t`!ii`, `!item` Cũng có cùng chức năng.\n" +
						 "`!items <name>`: Tìm kiếm item.\n" +
						 "\n" +
						 "**Misc**\n" +
						 "`!card`: Hiển thị ngẫu nhiên một card\n" +
						 "`!npc`: Hiển thị ngẫu nhiên một NPC.\n" +
						 "";
	
	let embed = new Discord.RichEmbed()
		.setTitle("Mavka đến từ Moscovia")
		.setColor("#1abc9c")
		.setThumbnail("https://static.divine-pride.net/images/items/cards/27161.png")
		.setURL("")
		.setDescription(msgDescription);

	message.channel.send({embed: embed});
}


module.exports.command = {
    name: "mavka"
}

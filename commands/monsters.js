const mobData = require("../json/monsters.json");
const jsonQuery = require('json-query');
const Discord = require('discord.js');
var config = require('../config.json');

module.exports.run = async(bot, message, args, authorID) => {
    let entry = args.join(" ").toUpperCase();

    if(!entry) return message.channel.send(`<@${authorID}>, Mavka không tìm thấy monster bạn yêu cầu :flushed:`);

    // let msg = await message.channel.send(`Mavka đang tìm kiếm thông tin monster...`);

    let query = `[* iName ~/^[^]*${entry}.*/ | id = ${entry}]`;
    
    let monsters = jsonQuery(query, {data: mobData, allowRegexp: true}).value;

    let total_monsters = monsters.length;
    if (total_monsters == 0) {
        return message.channel.send(`<@${authorID}>, Mavka không tìm thấy kết quả bạn yêu cầu :flushed:`);
    }

    message.channel.send(`<@${authorID}>, đây là một số kết quả mà Mavka tìm thấy cho bạn:`);

    let limit_result = config.limit_result;
    if (total_monsters < config.limit_result) {
        limit_result = total_monsters
    }

    for (i = 0; i <= (limit_result - 1); i++) {
        let monster = monsters[i];

        let msgDescription = "Mob ID: " + monster.id + "\t" +
                             "Lvl: " + monster.LV + "\t" +
                             "HP: " + monster.HP + "\t" +
                             "bEXP: " + monster.EXP + "\t" +
                             "jEXP: " + monster.JEXP;

        let embed = new Discord.RichEmbed()
            .setTitle("Name: " + monster.name)
            .setColor("#1abc9c")
            .setThumbnail("http://file5.ratemyserver.net/mobs/"+ monster.id +".gif")
            .setURL("http://db.irowiki.org/db/monster-info/"+ monster.id +"/")
            .setDescription(msgDescription);

        message.channel.send({embed: embed});
    }

    // msg.delete();

}


module.exports.command = {
    name: "monsters"
}


    // [* name_english~/^[^]*Red Potion.*/ | name_japanese~/^[^]*Red Potion.*/]

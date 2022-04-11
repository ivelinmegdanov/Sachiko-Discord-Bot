const ping = require('minecraft-server-util')
module.exports = {
    name: 'listplayers',
    description: 'minecraft ping command',
    execute(client, message, cmd, args, Discord) {
        let minecraftIp = '25.68.195.229';
        ping.status(minecraftIp)
            .then((response) => {
                let holder = [];
                response.samplePlayers.forEach(element => {
                    holder.push(element.name);
                });
                console.log(response);
                const Embed = new Discord.MessageEmbed()
                    .setColor('#0B0C10')
                    .setTitle(':ice_cube: Online Players :ice_cube:')
                    .setURL("https://www.youtube.com/channel/UCHOyhAFOca1hVVU88TR3VoQ")
                    .setDescription(`${holder.join("\n")}`)
                    .setFooter('Big PP Gang!')

                message.channel.send(Embed)
            })
    }
}
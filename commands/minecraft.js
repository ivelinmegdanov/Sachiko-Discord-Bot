const ping = require('minecraft-server-util')
module.exports = {
    name: 'minecraft',
    description: 'minecraft ping command',
    execute(client, message, cmd, args, Discord) {
        let minecraftIp = '25.68.195.229';
        //let minecraftPort = '25935';
        ping.status(minecraftIp)
            .then((response) => {
                console.log(response);
                const Embed = new Discord.MessageEmbed()
                    .setColor('#0B0C10')
                    .setTitle(':ice_cube: Server Status :ice_cube:')
                    .setURL("https://www.youtube.com/channel/UCHOyhAFOca1hVVU88TR3VoQ")
                    .setDescription('WoooooooooooopV4.5')
                    .addFields(
                        { name: ':satellite: Server IP:', value: `${response.host}` },
                        { name: ':satellite_orbital: Server Port:', value: `${response.port}` },
                        { name: ':fire: Server Version:', value: `${response.version}` },
                        { name: ':signal_strength: Online Players:', value: `${response.onlinePlayers}` },
                        { name: ':arrow_double_up: Max Players:', value: `${response.maxPlayers}` },
                    )
                    //.setImage('https://media.makeameme.org/created/i-got-big-4d46be717c.jpg')
                    .setFooter('Big PP Gang!')

                message.channel.send(Embed)
            })
            .catch((error) => {
                message.channel.send(`The server is offline :(`);
            })
    }
}
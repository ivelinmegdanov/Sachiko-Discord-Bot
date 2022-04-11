module.exports = {
    name: 'ping',
    description: 'ping command',
    execute(client, message, cmd, args, Discord) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0B0C10')
            .setTitle('🖤 Bot Ping 🖤')
            .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. 
            API Latency is ${Math.round(client.ws.ping)}ms`);

        message.channel.send(embed)
    }
}
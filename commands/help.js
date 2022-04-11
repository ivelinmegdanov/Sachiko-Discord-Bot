module.exports = {
    name: 'help',
    aliases: ['h', 'helpme'],
    description: 'help command',
    execute(client, message, cmd, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#0B0C10')
            .setTitle('🖤 Commands 🖤')
            .setURL("https://www.youtube.com/channel/UCHOyhAFOca1hVVU88TR3VoQ")
            .setDescription('Those are my commands:')
            .addFields(
                { name: ':satellite: Check my ping.', value: ',ping' },
                { name: ':bookmark_tabs: Welp Command.', value: ',help' },
                { name: ':poop: Pee Pee Poo Poo.', value: ',pp' },
                { name: ':skull: Use this command only if you are very angwy.', value: ',kys @someone' },
                { name: ':musical_note: Make me play music.', value: ',play/p {link/name}\n,stop\n,skip\n,queue/q\n,shuffle' },
                { name: ':ice_cube: My minecraft server status.', value: ',minecraft\n,listplayers' },
            )
            .setImage('https://media.discordapp.net/attachments/727243562282123355/798949265559912448/da.png?width=316&height=281')
            .setFooter('Made with 🖤 by ..>jh? in Node.js/Typescript')
        message.channel.send(newEmbed);
    }
}
module.exports = (Discord, client, message) => {
    const prefix = ',';
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command){
        try {
            command.execute(client, message, cmd, args, Discord);
        }
        catch {
            message.channel.send("No such command :(");
            message.channel.send("Type ',help' for help.");
        }
    }
}
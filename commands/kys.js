module.exports = {
    name: 'kys',
    description: 'kys command',
    async execute(client, message, cmd, args, Discord) {
        if (!args.length) return message.channel.send('Eyy you forgot to @someone!');
        const validateUser = (str) => {
            var regex = /<@![0-9]*>/;
            if (!regex.test(str)) {
                return false;
            } else {
                return true;
            }
        }
        if (validateUser(args[0])) {
            if (args[0] == "<@!796294236244672512>") {
                message.channel.send(`Nya :pleading_face:`);
            }
            else {
                message.channel.send(`${args[0]} Kill yourself. :point_right: :point_left: `);
                message.channel.send("https://tenor.com/view/kermit-the-frog-hanging-kill-gif-13667568");
            }
        }
        else {
            message.channel.send('Eyy.. you forgot to @someone!');
        }
    }
}
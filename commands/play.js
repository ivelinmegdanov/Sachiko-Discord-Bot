const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { filterFormats } = require('ytdl-core');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue', 'q', 'leave', 'shuffle', 'pause', 'unpause'],
    description: 'music commands',
    async execute(client, message, cmd, args, Discord) {

        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Mmm.. You need to be in a voice chat in order to use this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('No Permissions.. No music!');
        if (!permissions.has('SPEAK')) return message.channel.send('No Permissions.. No music!');

        const server_queue = queue.get(message.guild.id);

        if (cmd == 'play' || cmd == 'p') {
            if (!args.length) return message.channel.send('Eyy.. You forgot to enter the song name or url!');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            }
            else {
                const video_finder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url }
                }
                else {
                    message.channel.send('I cannot find your song :cry:.');
                    return;
                }
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            if (!server_queue) {

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting :cry:!');
                    throw err;
                }
            }
            else {
                server_queue.songs.push(song);
                return message.channel.send(`:star_struck: Oki! **${song.title}** added to queue!`);
            }
        }

        else if (cmd === 'skip') skip_song(message, server_queue);
        else if (cmd === 'stop' || cmd === 'leave') stop_song(message, server_queue);

        else if (cmd === 'shuffle') {
            randomArrayShuffle(queue.get(message.guild.id).songs);
            return message.channel.send(`With the **shuffle**, you exhaust me like a **muffle**!`);
        }

        else if (cmd == "pause") {
            if (server_queue.connection.dispatcher.paused)
                return message.channel.send("Song is already paused!");
            server_queue.connection.dispatcher.pause();
            message.channel.send("Paused the song!");
        }
        else if (cmd == "unpause") {
            if (!server_queue.connection.dispatcher.paused)
                return message.channel.send("Song isn't paused!");
            server_queue.connection.dispatcher.resume();
            message.channel.send("Unpaused the song!");
        }


        else if (cmd === 'q' || cmd === 'queue') {
            let holder = '';
            let holder2 = 0;
            let holder3 = '';
            let first = true;
            try {
                queue.get(message.guild.id).songs.forEach(element => {
                    if (first) {
                        holder3 = `${element.title}`;
                        first = false;
                    }
                    else {
                        holder += `${holder2}: ${element.title}\n`;
                    }
                    holder2++;
                });

                const newEmbed = new Discord.MessageEmbed()
                    .setColor('#0B0C10')
                    .setTitle(`Queue for ${message.guild.name}`)
                    .setURL("https://www.youtube.com/channel/UCHOyhAFOca1hVVU88TR3VoQ")
                    .addFields(
                        { name: '__Now Playing:__', value: `\`${holder3}\`` },
                    )
                    .addFields(
                        { name: '__Next Playing:__', value: `\`${holder}\`` },
                    )
                    .setDescription(`${holder2} songs in queue!`)
                    .setFooter('Made with 🖤 by ..>jh? in Node.js/Typescript')
                message.channel.send(newEmbed);
            }
            catch {
                message.channel.send("Nothing is playing..");
            }
        }
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
    await song_queue.text_channel.send(`:star_struck: Now playing: **${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Mmm.. You need to be in a voice chat in order to use this command!');
    if (!server_queue) {
        return message.channel.send(`There are no more songs left in the queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Mmm.. You need to be in a voice chat in order to use this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

function randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (1 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        if (randomIndex !== 0 && currentIndex !== 0) {
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }
    return array;
}
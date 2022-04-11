const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'ppsecret',
    description: 'play pee pee poo poo song command',
    async execute(client, message, cmd, args, Discord){
      const voiceChannel = message.member.voice.channel;
      args[0] = 'https://www.youtube.com/watch?v=EZPJiqZIeWE';
 
      if (!voiceChannel) return message.channel.send('Mmm.. You need to be in a voice chat in order to use this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('No Permissions.. No music!');
        if (!permissions.has('SPEAK')) return message.channel.send('No Permissions.. No music!');

      const validURL = (str) =>{
          var regex = /(http|https):\/\/www\.youtube\.com\/.*/;
          if(!regex.test(str)){
              return false;
          } else {
              return true;
          }
      }

      if(validURL(args[0])){
          const connection = await voiceChannel.join();
          const stream  = ytdl(args[0], {filter: 'audioonly'});

          connection.play(stream, {seek: 0, volume: 1})
          .on('finish', () =>{
              voiceChannel.leave();
          });
          await message.reply(`Now checking your ***Pee Pee Poo Poo***`)
          return
      }
    }
}
const ytdl = require('discord-ytdl-core');
const search = require('youtube-search');

const playMusic = (args,message) => {
    console.log('invoked play');
    if (!message.member.voice.channel) return message.channel.send("You're not in a voice channel?");

    let songName = args
    songName.shift();
    songName = songName.join(' ');

    var opts = {
        maxResults: 1,
        key: process.env.YOUTUBE_KEY
    };

    search(songName, opts, function(err, results) {
        if(err) return console.log(err);
        let stream = ytdl(results[0].link, {
            filter: "audioonly",
            opusEncoded: false,
            fmt: "mp3",
            encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
        });

        message.member.voice.channel.join()
        .then(connection => {
            let dispatcher = connection.play(stream, {
                type: "unknown"
            })
            .on("finish", () => {
                message.guild.me.voice.channel.leave();
            })
            message.channel.send(`Now Playing! - ${results[0].title}`);
            message.channel.send(`${results[0].thumbnails.default.url}`);
        });
    });
}

module.exports = playMusic;
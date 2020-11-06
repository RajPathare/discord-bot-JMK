const Discord = require('discord.js');
var cron = require('node-cron');
const express = require('express');
require('dotenv').config();
const imagefetch = require('reddit-image-fetcher');
const ytdl = require('discord-ytdl-core');
const search = require('youtube-search');
var Quote = require('inspirational-quotes');
var oneLinerJoke = require('one-liner-joke');

const prefix = '@';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.json({
        "message": "The app is running fine!",
        "time": new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    });
})


app.get('*',(req,res)=>{
    res.json({
        "message": "Not found!!"
    });
})

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on("message", (message)=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    console.log(args);
    if (args[0] === "play") {
        console.log('invoked play')
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
    
})

client.on('ready',()=>{
    cron.schedule('00 05 * * *',()=>{
        console.log('markin trigger!');
        sendGif();
        sendMessageForMarkIn();
    })
    cron.schedule('00 06 * * *',()=>{
        console.log('call trigger!');
        sendMessageForCall();
    })
    cron.schedule('00 10 * * *',()=>{
        console.log('quote trigger!');
        sendQuote(); 
    })
    cron.schedule('00 14 * * *',()=>{
        console.log('markout trigger!');
        sendGif();
        sendMessageForMarkOut();
    })
    cron.schedule('00 17 * * *',()=>{
        console.log('game trigger!');
        sendGif();
        sendMessageForAmongUs();
    })
    cron.schedule('0 */3 * * *',()=>{
        console.log('joke trigger!');
        sendMessageForJoke();
    })
})

const sendMessageForAmongUs = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("@everyone Among us anyone?");
    }
}

const sendMessageForMarkIn = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("@everyone This is the right time to MARK IN!");
    }
}

const sendMessageForMarkOut = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("@everyone Maybe you can MARK OUT now?");
    }
}

const sendMessageForCall = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("Hey it's time for standup! Do you remember the code? Let me help you out - 243319");
    }
}

const sendQuote = async () => {
    var theQuote = await Quote.getQuote();
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("It's almost half-day! Here's a nice quote for you which might inspire you in some way ~");
        guild.channels.cache.get('689367318345809923').send(theQuote.text);
        guild.channels.cache.get('689367318345809923').send("-",theQuote.author);
    }
}

const sendMessageForJoke = async () => {
    var getRandomJoke = oneLinerJoke.getRandomJokeWithTag('flirty');
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("Hmm... I can't bear silence. I just came up with a pickup line, hope you'll like it!");
        guild.channels.cache.get('689367318345809923').send(getRandomJoke.body);
    }
}

const sendGif = async () => {

    imagefetch.fetch({
        type: 'meme',
        total: 1, 
        addSubreddit: ['memes', 'funny'], 
        removeSubreddit: ['dankmemes']
    }).then(result => {
        console.log(result[0].image) 
        let attachment = new Discord.MessageAttachment(result[0].image);
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send(attachment);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



const Discord = require('discord.js');
var cron = require('node-cron');
const express = require('express');
require('dotenv').config();
const imagefetch = require('reddit-image-fetcher');

const prefix = '@';

const app = express();

const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.json({
        "message": "The app is running fine!"
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
    console.log(commandBody);
    const args = commandBody.split(' ');
    console.log('ARGS',args);
    console.log(args[0], args[1], args[2]);
    const command = args.shift().toLowerCase();

    console.log(command);

    if(command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`pong, Latency - ${timeTaken}ms`);
    }
    
})

client.on('ready',()=>{
    cron.schedule('00 06 * * *',()=>{
        console.log('call trigger!');
        sendGif();
        sendMessageForStandup();
    })
    cron.schedule('30 04 * * *',()=>{
        console.log('markin trigger!');
        sendMessageForMarkIn();
        sendGif();
    })
    cron.schedule('00 14 * * *',()=>{
        console.log('markout trigger!');
        sendMessageForMarkOut();
        sendGif();
    })
})

const sendMessageForStandup = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("@everyone Call pe chalo!!!");
    }
}

const sendMessageForMarkIn = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("@everyone MARK IN!!!!");
    }
}

const sendMessageForMarkOut = async () => {
    var guild = client.guilds.cache.get('689367318345809920');
    if(guild && guild.channels.cache.get('689367318345809923')){
        guild.channels.cache.get('689367318345809923').send("@everyone MARK OUT!!!");
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



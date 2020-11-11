const Discord = require('discord.js');
const express = require('express');
require('dotenv').config();
var cron = require('node-cron');

const wolframAPI = require('./tasks/wolframAPI');
const playMusic = require('./tasks/playMusic');
const { sendMessageForAmongUs,
    sendMessageForMarkInOrWeekend,
    sendMessageForMarkOut,
    sendMessageForCall,
    sendQuote,
    sendMessageForJoke,
    sendMessageForFact,
    sendGif,
    sendMessageForFeature } = require('./tasks/sendMyMessages');

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
        "message": "Page not found!"
    });
})

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on("message", async (message)=>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    console.log('ARGS:',args);
    if(args[0] === "ask")
    {
        wolframAPI(args,message);
    }
    else if (args[0] === "play") {
        playMusic(args,message);
    }
    
})

client.on('ready',()=>{
    cron.schedule('00 05 * * *',()=>{
        console.log('markin trigger!');
        sendMessageForMarkInOrWeekend(client);
    })
    cron.schedule('00 06 * * *',()=>{
        console.log('call trigger!');
        sendMessageForCall(client);
    })
    cron.schedule('45 06 * * *',()=>{
        console.log('feature trigger');
        sendMessageForFeature(client);
    })
    cron.schedule('15 10 * * *',()=>{
        console.log('quote trigger!');
        sendQuote(client); 
    })
    cron.schedule('00 11 * * *',()=>{
        console.log('joke trigger!');
        sendMessageForJoke(client);
    })
    cron.schedule('00 12 * * *',()=>{
        console.log('fact trigger!');
        sendMessageForFact(client);
    })
    cron.schedule('00 13 * * *',()=>{
        console.log('fact trigger!');
        sendMessageForFact(client);
    })
    cron.schedule('00 14 * * *',()=>{
        console.log('markout trigger!');
        sendMessageForMarkOut(client);
    })
    cron.schedule('30 16 * * *',()=>{
        console.log('game trigger!');
        sendGif(client);
        sendMessageForAmongUs(client);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


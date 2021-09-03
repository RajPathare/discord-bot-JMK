const Discord = require('discord.js');
const express = require('express');
require('dotenv').config();
var cron = require('node-cron');

const wolframAPI = require('./tasks/wolframAPI');
const playMusic = require('./tasks/playMusic');
const translateMyText = require('./tasks/translateMyText');
const { sendMessageForCOD,
    sendMessageForMarkInOrWeekend,
    sendMessageForMarkOut,
    sendMessageForCall,
    sendQuote,
    sendMessageForJoke,
    sendMessageForFact,
    sendGif,
    sendMessageForFeature,
    sendMessageForBirthday } = require('./tasks/sendMyMessages');

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
    else if (args[0] === "translate") {

        console.log("ISO code:", args[args.length-1]);
        const ISO = args[args.length-1];
        args.pop(args.length-1);
        translateMyText(args,message,ISO);
    }
    
})

client.on('ready', async ()=>{

    console.log('ready!');

    // const channel = client.channels.cache.find(channel => channel.name === "general");
    const channel = await client.channels.fetch("883316926628110386");

    cron.schedule('00 05 * * *',()=>{
        console.log('markin trigger!');
        sendMessageForMarkInOrWeekend(client, channel);
    })
    // cron.schedule('30 06 * * *',()=>{
    //     console.log('call trigger!');
    //     sendMessageForCall(client, channel);
    // })
    // cron.schedule('45 06 * * *',()=>{
    //     console.log('feature trigger');
    //     sendMessageForFeature(client, channel);
    // })
    cron.schedule('15 10 * * *',()=>{
        console.log('quote trigger!');
        sendQuote(client, channel); 
    })
    cron.schedule('00 11 * * *',()=>{
        console.log('joke trigger!');
        sendMessageForJoke(client, channel);
    })
    // cron.schedule('00 12 * * *',()=>{
    //     console.log('fact trigger!');
    //     sendMessageForFact(client, channel);
    // })
    cron.schedule('00 13 * * *',()=>{
        console.log('fact trigger!');
        sendMessageForFact(client, channel);
    })
    cron.schedule('00 14 * * *',()=>{
        console.log('markout trigger!');
        sendMessageForMarkOut(client, channel);
    })
    cron.schedule('30 16 * * *',()=>{
        console.log('game trigger!');
        sendGif(client);
        sendMessageForCOD(client, channel);
    })
    // cron.schedule('30 18 * * *',()=>{
    //     console.log('birthday trigger!');
    //     sendMessageForBirthday(client, channel, "Raj");
    // })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


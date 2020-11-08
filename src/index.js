const Discord = require('discord.js');
const express = require('express');
require('dotenv').config();

const wolframAPI = require('./tasks/wolframAPI');
const playMusic = require('./tasks/playMusic');
const sendMyMessages = require('./tasks/sendMyMessages');

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
    sendMyMessages();
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


const Discord = require('discord.js');
var cron = require('node-cron');
const express = require('express');
require('dotenv').config();

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


// const client = new Discord.Client();
// client.login(secrets.BOT_TOKEN);

// client.on("message", (message)=>{
//     if(message.author.bot) return;
//     if(!message.content.startsWith(prefix)) return;

//     const commandBody = message.content.slice(prefix.length);
//     console.log(commandBody);
//     const args = commandBody.split(' ');
//     console.log('ARGS',args);
//     console.log(args[0], args[1], args[2]);
//     const command = args.shift().toLowerCase();

//     console.log(command);

//     if(command === "ping"){
//         const timeTaken = Date.now() - message.createdTimestamp;
//         message.reply(`pong, Latency - ${timeTaken}ms`);
//     }
    
// })

// client.on('ready',()=>{
//     cron.schedule('30 11 * * *',()=>{
//         console.log('call trigger!');
//         sendMessageForStandup();
//     })
//     cron.schedule('00 10 * * *',()=>{
//         console.log('markin trigger!');
//         sendMessageForMarkIn();
//     })
//     cron.schedule('30 19 * * *',()=>{
//         console.log('markout trigger!');
//         sendMessageForMarkOut();
//     })
// })

// const sendMessageForStandup = async () => {
//     var guild = client.guilds.cache.get('689367318345809920');
//     if(guild && guild.channels.cache.get('689367318345809923')){
//         guild.channels.cache.get('689367318345809923').send("@everyone Call pe chalo!!!");
//     }
// }

// const sendMessageForMarkIn = async () => {
//     var guild = client.guilds.cache.get('689367318345809920');
//     if(guild && guild.channels.cache.get('689367318345809923')){
//         guild.channels.cache.get('689367318345809923').send("@everyone MARK IN!!!!");
//     }
// }

// const sendMessageForMarkOut = async () => {
//     var guild = client.guilds.cache.get('689367318345809920');
//     if(guild && guild.channels.cache.get('689367318345809923')){
//         guild.channels.cache.get('689367318345809923').send("@everyone MARK OUT!!!");
//     }
// }

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



const Discord = require('discord.js');
const config = require('./config/config.json');
var cron = require('node-cron');

const prefix = '@';

const client = new Discord.Client();
client.login(config.BOT_TOKEN);

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
    cron.schedule('30 11 * * *',()=>{
        console.log('call trigger!');
        sendMessageForStandup();
    })
    cron.schedule('00 10 * * *',()=>{
        console.log('markin trigger!');
        sendMessageForMarkIn();
    })
    cron.schedule('30 19 * * *',()=>{
        console.log('markout trigger!');
        sendMessageForMarkOut();
    })
    // cron.schedule('30 14 * * *',()=>{
    //     console.log('markout trigger!');
    //     playSong();
    // })
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

// const playSong = async () => {
//     var guild = client.guilds.cache.get('689367318345809920');
//     if(guild && guild.channels.cache.get('689367318345809923')){
//         guild.channels.cache.get('689367318345809923').send(";;play hello");
//     }
// }



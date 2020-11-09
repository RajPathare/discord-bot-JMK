const imagefetch = require('reddit-image-fetcher');
var Quote = require('inspirational-quotes');
var oneLinerJoke = require('one-liner-joke');
const factful = require('factful.js');
const getMyDay = require('./getDay');
const facts = factful.fact();


const sendMessageForFeature = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("Do you know? I love reading books! Try asking me some questions using the ask command! I'll try answering all of your questions :smirk_cat: ");
        }
    }
}

const sendMessageForAmongUs = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday')
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send(`@everyone Hey it's ${day}! Who's up for Among us?`);
        }
    }
    else if(day == 'Sunday')
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send(`@everyone Hey it's ${day}! I know you gotta get up early tomorrow but there's always time for Among us!`);
        }
    }
    else if(day == 'Friday')
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send(`@everyone Finally it's ${day}! We gotta play Among us!!`);
        }
    }
    else
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("@everyone Among us anyone?");
        }
    }
}

const sendMessageForMarkInOrWeekend = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday')
    {
        console.log('Weekend!');
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send(`@everyone Even if it's ${day}, I hope to see you soon!`);
        }
    }
    else if(day == 'Sunday')
    {
        console.log('Weekend!');
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send(`@everyone -yawns- Good morning everyone! Happy ${day}!`);
        }
    }
    else
    {
        console.log('Normal day!');
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("@everyone This is the right time to mark in!");
        }
    }
}

const sendMessageForMarkOut = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("@everyone Maybe you can mark out now.");
        }
    }
}

const sendMessageForCall = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("Hey it's time for standup! Do you remember the code? Let me help you out - 243319");
        }
    }
}

const sendQuote = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var theQuote = await Quote.getQuote();
        console.log(theQuote);
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("It's almost half-day! Here's a nice quote for you which might inspire you in some way ~");
            guild.channels.cache.get('689367318345809923').send(theQuote.text);
            guild.channels.cache.get('689367318345809923').send("-",theQuote.author);
        }
    }
}

const sendMessageForJoke = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var getRandomJoke = oneLinerJoke.getRandomJokeWithTag('flirty');
        console.log(getRandomJoke);
        var guild = client.guilds.cache.get('689367318345809920');
        if(guild && guild.channels.cache.get('689367318345809923')){
            guild.channels.cache.get('689367318345809923').send("Hmm... I can't bear silence. I just came up with a pickup line, hope you'll like it!");
            guild.channels.cache.get('689367318345809923').send(getRandomJoke.body);
        }
    }
}

const sendMessageForFact = async (client) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var guild = client.guilds.cache.get('689367318345809920');
        let types = ['space', 'covid', 'computer', 'food'];
        var numb = Math.floor(Math.random() * 4); 
        var myType = types[numb]; 
        let finalType = `facts.${myType}`;
        console.log(finalType);
        if(finalType == 'facts.covid')
        {
            console.log('cov');
            if(guild && guild.channels.cache.get('689367318345809923')){
                guild.channels.cache.get('689367318345809923').send("Here's a random covid19 fact for you!");
                guild.channels.cache.get('689367318345809923').send(facts.covid);
            }

        }
        if(finalType == 'facts.computer')
        {
            console.log('computer');
            if(guild && guild.channels.cache.get('689367318345809923')){
                guild.channels.cache.get('689367318345809923').send("Here's a random computer fact for you!");
                guild.channels.cache.get('689367318345809923').send(facts.computer);
            }

        }
        if(finalType == 'facts.space')
        {
            console.log('space');
            if(guild && guild.channels.cache.get('689367318345809923')){
                guild.channels.cache.get('689367318345809923').send("Here's a random space fact for you!");
                guild.channels.cache.get('689367318345809923').send(facts.space);
            }

        }
        if(finalType == 'facts.food')
        {
            console.log('food');
            if(guild && guild.channels.cache.get('689367318345809923')){
                guild.channels.cache.get('689367318345809923').send("Here's a random food fact for you!");
                guild.channels.cache.get('689367318345809923').send(facts.food);
            }
        }
    }
}

const sendGif = async (client) => {

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


module.exports = {
    sendMessageForAmongUs,
    sendMessageForMarkInOrWeekend,
    sendMessageForMarkOut,
    sendMessageForCall,
    sendQuote,
    sendMessageForJoke,
    sendMessageForFact,
    sendGif,
    sendMessageForFeature
}
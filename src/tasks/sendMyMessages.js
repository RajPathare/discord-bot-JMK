const imagefetch = require('reddit-image-fetcher');
var Quote = require('inspirational-quotes');
var oneLinerJoke = require('one-liner-joke');
const factful = require('factful.js');
const getMyDay = require('./getDay');
const facts = factful.fact();


const sendMessageForFeature = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        channel.send("Do you know? I can now talk in most of the languages! I'll try translating whatever you say!");
        channel.send("Try doing this - @translate hello marathi");
    }
}

const sendMessageForMiniMilitia = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday')
    {
        channel.send(`@everyone Hey it's ${day}! Who's up for Mini Militia?`);
    }
    else if(day == 'Sunday')
    {
        
        channel.send(`@everyone Hey it's ${day}! I know you gotta get up early tomorrow but there's always time for Mini Militia!`);
    }
    else if(day == 'Friday')
    {
       
        channel.send(`@everyone Finally it's ${day}! We gotta play Mini Militia!!`);
    }
    else
    {
        channel.send("@everyone Mini Militia anyone?");
    }
}

const sendMessageForMarkInOrWeekend = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday')
    {
        console.log('Weekend!');
        channel.send(`@everyone Even if it's ${day}, I hope to see you soon!`);
    }
    else if(day == 'Sunday')
    {
        console.log('Weekend!');
        channel.send(`@everyone -yawns- Good morning everyone! Happy ${day}!`);
    }
    else
    {
        console.log('Normal day!');
        channel.send("@everyone This is the right time to mark in!");
    }
}

const sendMessageForMarkOut = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        channel.send("@everyone Maybe you can mark out now.");
    }
}

const sendMessageForCall = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else if(day == 'Monday' || day == 'Thursday')
    {
       channel.send("Hey it's time for standup! Do you remember the code? Let me help you out - 243319");
    }
    else {
        console.log('No message!');
    }
}

const sendQuote = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var theQuote = await Quote.getQuote();
        console.log(theQuote);
        channel.send("It's almost half-day! Here's a nice quote for you which might inspire you in some way ~");
        channel.send(theQuote.text);
        channel.send(` - ${theQuote.author}`);
    }
}

const sendMessageForJoke = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var getRandomJoke = oneLinerJoke.getRandomJokeWithTag('flirty');
        console.log(getRandomJoke);
        channel.send("Hmm... I can't bear silence. I just came up with a pickup line, hope you'll like it!");
        channel.send(getRandomJoke.body);
    }
}

const sendMessageForFact = async (client, channel) => {
    var day = getMyDay();
    if(day == 'Saturday' || day == 'Sunday')
    {
        console.log('Weekend!');
    }
    else
    {
        var guild = client.guilds.cache.get('689367318345809920');
        let types = ['space', 'computer'];
        var numb = Math.floor(Math.random() * 4); 
        var myType = types[numb]; 
        let finalType = `facts.${myType}`;
        console.log(finalType);
        if(finalType == 'facts.computer')
        {
            console.log('computer');
            channel.send("Here's a random computer fact for you!");
            channel.send(facts.computer);

        }
        if(finalType == 'facts.space')
        {
            console.log('space');
            channel.send("Here's a random space fact for you!");
            channel.send(facts.space);
        }
    }
}

const sendGif = async (client, channel) => {

    imagefetch.fetch({
        type: 'meme',
        total: 1, 
        addSubreddit: ['memes', 'funny'], 
        removeSubreddit: ['dankmemes']
    }).then(result => {
        console.log(result[0].image) 
        let attachment = new Discord.MessageAttachment(result[0].image);
        channel.send(attachment);
    });
}


module.exports = {
    sendMessageForMiniMilitia,
    sendMessageForMarkInOrWeekend,
    sendMessageForMarkOut,
    sendMessageForCall,
    sendQuote,
    sendMessageForJoke,
    sendMessageForFact,
    sendGif,
    sendMessageForFeature
}
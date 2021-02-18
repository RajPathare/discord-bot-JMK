const translate = require('@vitalets/google-translate-api');
const getISOcode = require('./getISOcode');

const translateMyText = async (args,message,language) => {
    console.log('invoked translate text function!');

    if(args[1] === undefined)
    {
        console.log('Please enter some text!');
        message.channel.send("Please enter some text! :)");
    }
    else
    {
        console.log('text invoked');
        try
        {
            let myQuestion = args;
            myQuestion.shift();
            myQuestion = myQuestion.join(' ');
            console.log(myQuestion);

            let ISOcode = getISOcode(language);
            if(ISOcode === 0) {
                console.log("Hmm.. I couldn't understand the language :(");
                message.channel.send("Hmm.. I couldn't understand the language :(");
            }
            else {
                const text = await translate(myQuestion, {to: ISOcode});
                console.log('FINAL text - ',text.text);
                message.channel.send(text.text);
            }
        }
        catch (e)
        {
            console.log(e.message);
            message.channel.send("Hmm... I can't translate your text :( ");
        }
    }
}

module.exports = translateMyText;
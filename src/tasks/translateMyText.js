const translate = require('@vitalets/google-translate-api');

const translateMyText = async (args,message,ISO) => {
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

            const text = await translate(myQuestion, {to: ISO});
            console.log('FINAL text - ',text);
            message.channel.send(text.text);
        }
        catch (e)
        {
            console.log(e.message);
            message.channel.send("Hmm... I can't translate your text :( ");
        }
    }
}

module.exports = translateMyText;
const WolframAlphaAPI = require('wolfram-alpha-node');
const waApi = WolframAlphaAPI(process.env.WOLFRAM_API_KEY);

const wolframQuestions = async (args,message) => {

    if(args[1] === undefined)
    {
        console.log('ask me something!');
        message.channel.send("Ask me something! :)");
    }
    else
    {
        console.log('question invoked');
        try
        {
            let myQuestion = args;
            myQuestion.shift();
            myQuestion = myQuestion.join(' ');

            let resp = await waApi.getShort(myQuestion);
            console.log(resp);
            message.channel.send(resp);
        }
        catch (e)
        {
            console.log(e.message);
            message.channel.send("Hmm... I don't understand your question :( ");
        }
    }
}

module.exports = wolframQuestions;
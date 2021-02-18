const languages = require('./languanges');


const getISOcode = (language) => {

    language = language.toLocaleLowerCase();

    let languageList = Object.values(languages);

    for(let i=0;i<languageList.length;i++) {
        languageList[i] = languageList[i].toLocaleLowerCase();
    }

    let specifiedLanguage = languageList.includes(language);

    if(specifiedLanguage) {
        console.log("The language is supported!");

        for(var key in languages) {
            if(languages[key].toLocaleLowerCase() === language) {
                console.log(key);
                return key;
            }
        }
    }
    else {
        console.log("The specified language is not supported!");
        return 0;
    }

}

module.exports = getISOcode;
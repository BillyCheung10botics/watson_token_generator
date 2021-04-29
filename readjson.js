const fetch = require("node-fetch");
const TOKENJSON_URL = "http://localhost:30000/WatsonToken.json";
var token= {
            clear: true,
            decodeStrings: false,
            format: true,
            hesitation: "",
            model: "",
            objectMode: true,
            property: null,
            smartFormatting: true,
           };
fetch(TOKENJSON_URL)
.then(res => res.json())
.then(data => {
    const SPEECH_TO_TEXT_URL = data.SPEECH_TO_TEXT_URL;
    const SPEECH_TO_TEXT_TOKEN = data.SPEECH_TO_TEXT_TOKEN;
    Object.assign(token, {accessToken: SPEECH_TO_TEXT_TOKEN, url: SPEECH_TO_TEXT_URL});
    // console.log(token);
});
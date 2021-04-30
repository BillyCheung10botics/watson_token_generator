const cron = require('node-cron');
const express = require('express');
var cors = require('cors');
const fs = require('fs');
const { IamTokenManager } = require('ibm-watson/auth');

const credentialFileName = "./ibm-credentials.env";
const tokenFileName = "./public/WatsonToken.json";
// const scheduleInterval = '*/20 * * * * *'; // for dev only, please comment out
const scheduleInterval = '59 * * * *'; // IBM watson token expires after an hour
// =============================================
// read api, url value from credentials.env
// =============================================
const port=30000;
app = express();
// cron.schedule(scheduleInterval, function() {
//     console.log(`Cron Job Interval: ${scheduleInterval}:----------------------`)
//     console.log("Generating IBM Watson STT Token.")
//     // fs.readFile(credentialFileName, 'utf-8', getCredential);
//     console.log(`Outputed Token File '${tokenFileName}'.-----------------------`)
// });
app.get('/', (req, res) => {
    res.send('Hello World!')
  });
app.use(cors()); //can cause conflict if adding cors header to nginx config, comment out in this case
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`listening at ${port}`)
    // console.log(`Example app listening at http://localhost:${port}`)
});
fs.readFile(credentialFileName, 'utf-8', getCredential);
function getCredential (err, data) {
    if (err) {
        return console.log(err);
    }
    // console.log(data);
    const apikey = data.match(/(?<=SPEECH_TO_TEXT_APIKEY=)(.*)/g)[0];
    const url = data.match(/(?<=SPEECH_TO_TEXT_URL=)(.*)/g)[0];
    writeTokenJson(apikey, url, tokenFileName);
    cron.schedule(scheduleInterval, function() {
        console.log(`Cron Job Schedule Time: ${scheduleInterval}:----------------------`)
        console.log("Generating IBM Watson STT Token.")
        writeTokenJson(apikey, url, tokenFileName);
        console.log(`Outputed Token File '${tokenFileName}'.-----------------------`)
    });
    // writeTokenJson(apikey, url, tokenFileName);
}

function writeTokenJson(args_apikey, args_apiurl, tokenFileName) {
    // =============================================
    // get token from ibm server
    // =============================================
    const sttAuthenticator = new IamTokenManager({
        apikey: args_apikey
    });
    sttAuthenticator
    .requestToken()
    .then(({ result }) => {
        const current = new Date();
        const tokenFileData = {
                        timestamp: current.toLocaleString('en-US', {timeZone: "Asia/Hong_Kong"}), 
                        // SPEECH_TO_TEXT_APIKEY: args_apikey,
                        SPEECH_TO_TEXT_URL: args_apiurl,
                        SPEECH_TO_TEXT_TOKEN: result.access_token,
                        };

        // =============================================
        // write key, url, token to a file
        // =============================================
        function errorHandler (err) {
            if (err) {
                return console.log(err);
            }
        }
        fs.writeFile(tokenFileName, JSON.stringify(tokenFileData), errorHandler);
    })
    .catch(console.error);
}

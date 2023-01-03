const functions = require("firebase-functions");
const { Telegraf } = require('telegraf');
const axios = require('axios');

let config = require('./env.json');

if (Object.keys(functions.config()).length) {
  config = functions.config();
}
const axiosClient = new axios.Axios({
  apikey: config.service.axios_key
});

const bot = new Telegraf(config.service.telegram_key)
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

axios.get('https://api.weatherstack.com/current', {axiosClient})
  .then(response => {
    const apiResponse = response.data;
    console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
  }).catch(error => {
    console.log(error);
  });



// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  axiosClient.current('New York').then((current)=> {
    return response.send(current);
  }).catch((err)=>{
    return response.send(err);
  });
});

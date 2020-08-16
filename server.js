var Twit = require('twit');

require('dotenv').config();

var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});

let all_bangsat_kau = [];

// load the file
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('all_bangsat_kau.txt')
});

// store every line of tweets into an array
lineReader.on('line', function (line) {
    all_bangsat_kau.push(line);
});

// when every line already stored in array, send every tweet randomly every 1 minutes (worker)
lineReader.on('close', () => {
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * all_bangsat_kau.length);
        const status = all_bangsat_kau[randomIndex];
        T.post('statuses/update', { status }, function (err, data, response) {
            if (err) return console.log(err);
            console.log('tweet sent:', data.text);
            console.log('sleeping for 1 day...');
        });
    }, 24 * 60 * 60 * 1000);
});




// npm install stuff
// npm i request
// npm i node-spotify-api
// npm i moment

var request = require("request");
require("dotenv").config();


// //spotify request
var spotifyRequest = function (track) {
    const spotifyKeys = require('./keys.js');
    let keys = spotifyKeys;  

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: track }, function(err, data) {
        if (err) {
        return console.log('Error occurred:  err');
        };

        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Track: ' + data.tracks.items[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Preview URL: ' + data.tracks.items[0].preview_url);

    });
};

//omdb request
var omdbRequest = function(movie) {
    var movieName = movie.replace(" ", "+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    var request = require('request');
    request(queryUrl, function (error, response, body) {
        var omdbObject = body;

        omdbObject = omdbObject.replace("{", "");
        omdbObject = omdbObject.replace("}", "");
        omdbObject = omdbObject.split(",");

        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', omdbObject[0]); // Print the HTML for the Google homepage.
        console.log(omdbObject[0])
    });
};

if (process.argv[2] === 'spotify-this-song') {
    spotifyRequest(process.argv[3]);
} else if (process.argv[2] === 'movie-this') {
    omdbRequest(process.argv[3]);
}; 
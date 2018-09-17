
var request = require('request');
var fs = require('fs')
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
    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    
    request (omdbURL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log(`Title: ${body.Title}`);
            console.log(`Release Year: ${body.Year}`);
            console.log(`IMDb Rating: ${body.imdbRating}`);
            console.log(`Country: ${body.Country}`);
            console.log(`Language: ${body.Language}`);
            console.log(`Plot: ${body.Plot}`);
            console.log(`Actors: ${body.Actors}`);
            console.log(`Rotten Tomatoes Rating: ${body.tomatoRating}`);
            console.log(`Rotten Tomatoes URL: ${body.tomatoURL}`);

        } else {
            console.log("there was an error with your request");

        };
    });
};

// bands in town request
var bandsInTownRequest= function(artist) {
    var concertsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    request(concertsURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
        
            console.log(`Artist: ${body.artistData.name}`);
            console.log(`Date: ${body.eventData.datetime}`);
            console.log(`Venue: ${body.venueData.name}`);
        } else {
            console.log("There was an error with your request")
        };
    });
};

// reads the random.txt file
var readText = function() {
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
        spotifyRequest(txt[1]);
    });
}

if (process.argv[2] === 'spotify-this-song') {
    spotifyRequest(process.argv[3]);
} else if (process.argv[2] === 'movie-this') {
    omdbRequest(process.argv[3]);
} else if (process.argv[2] === 'concert-this') {
    bandsInTownRequest(process.argv[3]);
} else if (process.argv[2] === 'do-what-it-says') {
    readText();
}; 
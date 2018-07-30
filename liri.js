require("dotenv").config();
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
// var omdb = require('omdb');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

// something(action, argument)

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var argument = "";
var action = process.argv[2];
var songTitle = process.argv[3];
var movieName = process.argv[3];

switch (action) {
    case "my-tweets":
        tweets();
        // code block
        break;
    case `spotify-this-song`:
        getTheSong();
        // code block
        break;
    case "movie-this":
        getMovie();
        if (movieName === "") {
            getMovie("Mr. Nobody");

        } else {
            getMovie(movieName);
        }
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        // code block
}



function tweets() {
    // var client = new Twitter(twitterKeysFile.twitterKeys);
    // console.log("inside the tweet")
    var params = {
        q: '@RAfarod04667794',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // console.log("tweets We found", tweets)
        // if (!error) {

        for (var i = 0; i < tweets.length; i++) {
            var tweetText = tweets[i].text;
            console.log("Tweet Text: " + tweetText);
        }
        // } else {
        //     logOutput(error);
        // }
    });
}

function getTheSong() {
    var Spotify = require('node-spotify-api');

    spotify.search({
        type: 'track',
        query: songTitle
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data.tracks.items.length);
        for (let i = 0; i < data.tracks.items.length; i++) {
            console.log(data.tracks.items[i].name);
        }
    });
}

function getMovie(movieName) {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log("-------------", queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Movie title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).);
            console.log("Country Of Origin: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            results = data.split(",");
            getTheSong(results[2], results[3]);
        } else {
            console.log("oooooooooops" + err)
        }
    })
}

function log(logResults) {
    function log(logResults) {
        fs.appendFile("log.txt", logResults, (err) => {
            if (err) {
                throw err;
            }
        })
    }
}
require("dotenv").config();

var request = require("request");
var Spotify = require("node-spotify-api"); // npm spotify
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var omdbApi = require("omdb-client");

var command = process.argv[2];

if (command == "concert-this") {
    var artist = process.argv.slice(3, process.argv.length).join(' ');
    if (artist === "") {
        artist = "u2";
        console.log("You did not choose one, I selected : " + artist);
        console.log("**********************************");
    };

    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var jsonBody = JSON.parse(body);
            for (i = 0; i < jsonBody.length; i++) {
                console.log("Venue Name : " + JSON.parse(body)[i].venue.name);
                city = JSON.parse(body)[i].venue.city;
                state = JSON.parse(body)[i].venue.region;
                console.log("Location : " + city + ", " + state);
                date = moment(JSON.parse(body)[i].datetime).format('DD MM YYYY');
                console.log("Date: " + date);
                console.log("**********************************");
            }
        }
    });
}


else if (command == "spotify-this-song") {                          // nmp  install node-spotify-api
    var song = process.argv.slice(3, process.argv.length).join(' ');
    spoties();                                                      // funcion para buscar en spotify
}

else if (command == "movie-this") {                                 // npm i omdb-client
    movies();
}

else if (command == "do-what-it-says") {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");                      // divide el texto

        if (dataArr[0] == "concert-this") {                  // si es concert lo que encuentra en texto
            var artist = dataArr[1];
            console.log(artist);

            if (artist === "") {
                artist = "Luis Miguel";
                console.log("You did not choose one, I selected : " + artist);
                console.log("**********************************");
            };

            queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
            request(queryUrl, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    var jsonBody = JSON.parse(body);
                    for (i = 0; i < jsonBody.length; i++) {
                        console.log("Venue Name : " + JSON.parse(body)[i].venue.name);
                        city = JSON.parse(body)[i].venue.city;
                        state = JSON.parse(body)[i].venue.region;
                        console.log("Location : " + city + ", " + state);
                        date = moment(JSON.parse(body)[i].datetime).format('DD MM YYYY');
                        console.log("Date: " + date);
                        console.log("**********************************");
                    }
                }
            });
        }

        else if (dataArr[0] == "spotify-this-song") {        // si es spotify lo que encuentra en texto
            var song = dataArr[1];
            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Song Name : " + data.tracks.items[0].name);
                console.log("Preview URL : " + (data.tracks.items[0].preview_url ? data.tracks.items[0].preview_url : "Not Available"));
                console.log("Album Name: " + data.tracks.items[0].album.name);
                console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
            });
        }

        else if (dataArr[0] == "movie-this") {              // si es movie lo que encuentra en texto
            var movie = dataArr[1];
            if (movie !== "") {
                var params = {
                    apiKey: 'e3f8fd0c',
                    title: movie
                }
                omdbApi.get(params, function (err, data) {
                    console.log("Title of the movie: ", data.Title);
                    console.log("Year the movie came out: ", data.Year);
                    console.log("IMDB Rating of the movie: ", data.imdbRating);
                    console.log("Rotten Tomatoes Rating of the movie: ", data.Ratings);
                    console.log("Country where the movie was produced: ", data.Country);
                    console.log("Language of the movie: ", data.Language);
                    console.log("Plot of the movie: ", data.Plot);
                    console.log("Actors in the movie: ", data.Actors);
                });
            } else {
                var params = {
                    apiKey: 'e3f8fd0c',
                    title: "Mr. Nobody"
                }
                omdbApi.get(params, function (err, data) {
                    console.log("Title of the movie: ", data.Title);
                    console.log("Year the movie came out: ", data.Year);
                    console.log("IMDB Rating of the movie: ", data.imdbRating);
                    console.log("Rotten Tomatoes Rating of the movie: ", data.Ratings);
                    console.log("Country where the movie was produced: ", data.Country);
                    console.log("Language of the movie: ", data.Language);
                    console.log("Plot of the movie: ", data.Plot);
                    console.log("Actors in the movie: ", data.Actors);
                });
            };


        }

    });


};

function spoties() {
    if (song == "") {
        song = "The Sign Ace of Base";
    } else {

    };

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song Name : " + data.tracks.items[0].name);
        console.log("Preview URL : " + (data.tracks.items[0].preview_url ? data.tracks.items[0].preview_url : "Not Available"));
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
    });
}

function movies() {
    var movie = process.argv.slice(3, process.argv.length).join(' ');
    if (movie !== "") {
        var params = {
            apiKey: 'e3f8fd0c',
            title: movie
        }
        omdbApi.get(params, function (err, data) {
            console.log("Title of the movie: ", data.Title);
            console.log("Year the movie came out: ", data.Year);
            console.log("IMDB Rating of the movie: ", data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: ", data.Ratings);
            console.log("Country where the movie was produced: ", data.Country);
            console.log("Language of the movie: ", data.Language);
            console.log("Plot of the movie: ", data.Plot);
            console.log("Actors in the movie: ", data.Actors);
        });
    } else {
        var params = {
            apiKey: 'e3f8fd0c',
            title: "Mr. Nobody"
        }
        omdbApi.get(params, function (err, data) {
            console.log("Title of the movie: ", data.Title);
            console.log("Year the movie came out: ", data.Year);
            console.log("IMDB Rating of the movie: ", data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: ", data.Ratings);
            console.log("Country where the movie was produced: ", data.Country);
            console.log("Language of the movie: ", data.Language);
            console.log("Plot of the movie: ", data.Plot);
            console.log("Actors in the movie: ", data.Actors);
        });
    };
};
// PACKAGES ==================================================================

require("dotenv").config();
require("fs")

var moment = require("moment");
var keys = require("./keys.js");
var axios = require("axios")
var fs = require("fs")

// ===========================================================================

// CAPTURE ARGUMENTS AND CALL API ============================================

var command = (process.argv[2]).toLowerCase()
var searchTerm = process.argv[3]
callAPI()

function callAPI(){
  if (!command){
    console.log("Please enter a command.")
  }
  else if (command === "concert-this") {
    concertThis();
  }
  else if (command === "spotify-this-song") {
    spotifyThis();
  }
  else if (command === "movie-this") {
    movieThis();
  }
  else if (command === "do-what-it-says") {
    readText();
  }
  else {
    console.log("Invalid Command: " + command)
  }
}

// ===========================================================================

// FUNCTIONS =================================================================

// BANDSINTOWN ===============================================================

function concertThis(){

if (!searchTerm){
  searchTerm = "311"
}

var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
axios
  .get(queryURL)
  .then(function(response) {
    // console.log(response.data);

  for (var i = 0; i < response.data.length; i++){
      artist = searchTerm
      venue = response.data[i].venue.name
      venueLocation = response.data[i].venue.location
      showTime = moment(response.data[i].datetime).format('L')
      log(i+1)
      log("Artist: " + artist)
      log("Venue: " + venue)
      log("Venue Location: " + venueLocation)
      log("Showtime: " + showTime)
      log("=================================================================")

    }
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      log(error.response.data);
      log(error.response.status);
      log(error.response.headers);

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      log("Error", error.message);
    }
    log(error.config);
  });
  
}

// =========================================================================

// SPOTIFY =================================================================

function spotifyThis(){

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// console.log(spotify)

var getArtistNames = function(artist) {
  return artist.name;
};

if (!searchTerm) {
  searchTerm = "The Sign"
}

spotify
.search({ type: 'track', query: searchTerm })
  .then(function(response) {
    // console.log(response);
    var songs = response.tracks.items
    for (var i = 0; i < songs.length; i++) {
      log(i+1);
      log("Artist(s): " + songs[i].artists.map(getArtistNames));
      log("Song Name: " + songs[i].name);
      log("Preview URL: " + songs[i].preview_url);
      log("Album: " + songs[i].album.name);
      log("================================================================");
    }
    
  })
  .catch(function(err) {
    console.log(err);
  });
}
// ==========================================================================

// OMDB =====================================================================

function movieThis(){

  if (!searchTerm){
    searchTerm = "Goodfellas"
  }

  queryURL = "http://www.omdbapi.com/?apikey=632b31c5&t=" + searchTerm

  axios
  .get(queryURL)
  .then(function(response) {
    // console.log(response.data)

      movie = response.data
   
      for (var i = 0; i < movie.Ratings.length; i++){
          if (movie.Ratings[i].Source === "Rotten Tomatoes"){
            rottenTomatoesRating = movie.Ratings[i].Value          
          } 
      }

      log("Title: " + movie.Title)
      log("Year: " + movie.Year)
      log("IMDB Rating: " + movie.imdbRating)
      log("Rotten Tomatoes Rating: " + rottenTomatoesRating)
      log("Country: " + movie.Country)
      log("Language: " + movie.Language)
      log("Plot: " + movie.Plot)
      log("Actors: " + movie.Actors)
      log("=================================================================")

  })

  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

// =====================================================================================

// READ TEXT ===========================================================================

function readText(){

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    // console.log(data);

    // Data is split by commas and placed in an array.
    var dataArr = data.split(",");

    // Array indexes are stored as variables and the callAPI function is called again.
    
    command = dataArr[0]
    searchTerm = dataArr[1]
    callAPI()
  });
}

// ====================================================================================

// LOGGING FUNCTIONS ==================================================================

var error = function(err){
  if (err){
    return console.log(err)
  }
}

timeStampFile(command, searchTerm)

function timeStampFile(text) {
  fs.appendFile("log.txt", "[" + moment().format('MMMM Do YYYY, h:mm:ss a') + "]\r", error)
  fs.appendFile("log.txt", "Command: " + text + "\r", error)
  if (searchTerm){
    fs.appendFile("log.txt", "Search Term: " + searchTerm + "\r", error)
  }
  fs.appendFile("log.txt", "==================================================" + "\r", error)
  }

function log(text){
  fs.appendFile("log.txt", text + "\r", error)
  console.log(text)
}
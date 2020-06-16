// DOTENV REQUIRE ========================================

require("dotenv").config();
require("fs")

var moment = require("moment");
var keys = require("./keys.js");
var axios = require("axios")

// ===========================================================================

// CAPTURE ARGUMENTS =========================================================

var command = process.argv[2]

var searchTerm = process.argv[3]

if (command.toLowerCase() === "concert-this") {
  concertThis();
}

else if (command.toLowerCase() === "spotify-this-song") {
  console.log("Spotifying")
  spotifyThis();
}

else if (command.toLowerCase() === "movie-this") {
  movieThis();
}

else if (command.toLowerCase() = "do-what-it-says") {
  readText();
}

// ===========================================================================

// BANDSINTOWN ===============================================================

function concertThis(){

var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
console.log(queryURL)
axios
  .get(queryURL)
  .then(function(response) {
    // console.log(response.data);
    console.log("=================================================================")

  for (var i = 0; i < response.data.length; i++){
      artist = searchTerm
      venue = response.data[i].venue.name
      venueLocation = response.data[i].venue.location
      showTime = moment(response.data[i].datetime).format('L')
      
      console.log("Artist: " + artist)
      console.log("Venue: " + venue)
      console.log("Venue Location: " + venueLocation)
      console.log("Showtime: " + showTime)
      console.log("=================================================================")

    }
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

// =========================================================================

// SPOTIFY API CALL ========================================================

function spotifyThis(){

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
console.log(spotify)

var getArtistNames = function(artist) {
  return artist.name;
};

if (!searchTerm) {
  searchTerm = "The Sign"
}

spotify
.search({ type: 'track', query: searchTerm })
  .then(function(response) {
    console.log(response);
    var songs = response.tracks.items
    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artists.map(getArtistNames));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-----------------------------------");
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
    searchTerm = "Mr. Nobody"
  }

  queryURL = "http://www.omdbapi.com/?apikey=632b31c5&t=" + searchTerm

  axios
  .get(queryURL)
  .then(function(response) {
    // console.log(response.data)
  
    console.log("=================================================================")

      movie = response.data
   
      for (var i = 0; i < movie.Ratings.length; i++){
          if (movie.Ratings[i].Source === "Rotten Tomatoes"){
            rottenTomatoesRating = movie.Ratings[i].Value          
          } 
      }

      console.log("Title: " + movie.Title)
      console.log("Year: " + movie.Year)
      console.log("IMDB Rating: " + movie.imdbRating)
      console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating)
      console.log("Country: " + movie.Country)
      console.log("Language: " + movie.Language)
      console.log("Plot: " + movie.Plot)
      console.log("Actors: " + movie.Actors)
      console.log("=================================================================")

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
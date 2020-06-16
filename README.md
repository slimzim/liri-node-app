# LIRI Bot

### Introduction and Overview

This app (LIRI) retrieves data from REST APIs at Spotify, Bandsintown, and OMDB via Node.js!  The user is able to search Spotify by track name, Bandsintown by artist, and OMDB by movie title.  The app then displays data in a readable format into the console log and also logs both the user's search terms and results in a text file.

Follow this [link] for a video demonstration and overview!

### Instructions

Use the following syntax to make API calls (do not forget to use "" around search terms with spaces):

   1. * [Bandsintown]:
        Syntax: node liri.js concert-this "band name here"
        Example: node liri.js concert-this "The Rolling Stones"

   2. * [Spotify]:
        Syntax: node liri.js spotify-this-song "track name here" 
        Example:  liri.js spotify-this-song "While My Guitar Gently Weeps"
    
   3. * [OMDB]:
        Syntax: node liri.js movie-this "movie name here"
        Example: node.liri.js movie-this "Back to the Future"

   4. * [readFile]
        Syntax: node liri.js do-what-it-says
        The argument "do-what-it-says" calls a function that reads text from a file, and calls the appropriate function.  See video for further demonstration.  

### Technologies Used
   
   NPM Packages:
   [dotenv] (https://www.npmjs.com/package/dotenv)
   [moment.js] (https://www.npmjs.com/package/moment)
   [axios] (https://www.npmjs.com/package/axios)
   [Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)

   APIs:
   [Bandsintown] (https://bit.ly/2N6ueAh)
   [Spotify] (https://developer.spotify.com/documentation/web-api/quick-start/)
   [OMDB] (http://www.omdbapi.com)



Questions to Ask:

Why does the log.txt output sometimes display in the wrong order?  Any way to fix?
For demonstration purposes, run it twice.

Is appendFile() called a Method?  Is error called a promise function?
const express = require('express'); // Import Express 
const axios = require('axios'); // Import the Axios library for making HTTP requests
const path = require('path'); // Import the Path module for handling and transforming file paths

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port to the value of the environment variable PORT or default to 3000
const API_KEY = '8f1d9dfc40f23ef2e578f84d6e9fba47'; // Set the API key for The Movie Database (TMDb) API

// Set up EJS as the view engine
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set the directory for EJS views

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)

// Homepage route
app.get('/', (req, res) => {
    res.render('index'); // Render the 'index.ejs' template for the homepage
});

// Search form submission route
app.post('/search', async (req, res) => {
    const movieTitle = req.body.title; // Get the movie title from the form submission

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: API_KEY,
                query: movieTitle
            }
        }); // Make a GET request to the TMDb API to search for movies with the provided title

        const movies = response.data.results; // Extract the list of movies from the response

        if (movies.length > 0) {
            const firstMovie = movies[0]; // Get the first movie in the search results
            res.redirect(`/movie/${firstMovie.id}`); // Redirect to the movie details page for the first movie
        } else {
            res.send("No movie found"); // Send a response indicating no movies were found
        }
    } catch (error) {
        console.error(error); // Log the error to the console
        res.send("An error occurred while searching for the movie"); // Send a response indicating an error occurred
    }
});

// Movie details route
app.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id; // Get the movie ID from the URL parameters

    try {
        // Fetch the details of the selected movie
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: API_KEY
            }
        });

        // Fetch similar movies based on the selected movie
        const similarResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
            params: {
                api_key: API_KEY
            }
        });

        const movieDetails = movieResponse.data; // Extract the movie details from the response
        const similarMovies = similarResponse.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/default.jpg'
        })); // Extract and format the similar movies

        // Render the movie details page with movie details and similar movies
        res.render('movie_details', { movie: movieDetails, similarMovies: similarMovies });

    } catch (error) {
        console.error(error); // Log the error to the console
        res.send("An error occurred while fetching movie details"); // Send a response indicating an error occurred
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

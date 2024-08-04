# Similar Movies Application

This application displays a list of movies similar to the one entered by the user, using the TMDb (The Movie Database) API. The application allows the user to select a movie and then presents a list of movies that share similarities with the selected movie.

## Features
- Search for a movie by name.
- Select a movie from the search results.
- Display a list of movies similar to the selected movie.
- Responsive design for mobile and desktop views.

## Demo
A live demo of the application can be found [here](https://netflic-app.onrender.com/).

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@github.com:BeniKiambote10/netflic_app.git
    cd similar-movies
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of your project and add your TMDb API key:
    ```env
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage
1. Enter the name of a movie in the search bar.
2. Select a movie from the search results.
3. View the list of similar movies displayed on the page.

## API Documentation
This project uses the TMDb API to fetch movie data. For detailed API documentation, visit the [TMDb API Documentation](https://developer.themoviedb.org/docs).

### Important Note
- Do not use any of the packages listed in the [Wrappers & Libraries](https://developer.themoviedb.org/docs/wrappers-and-libraries) section of the TMDb documentation, such as [moviedb](https://github.com/impronunciable/moviedb).

## Project Structure

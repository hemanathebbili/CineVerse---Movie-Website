const apiKey = '06441985e67b0834a714e7433b1250ca'; // Replace with your TMDb API key
const baseUrl = 'https://api.themoviedb.org/3';

// Function to fetch movies by genre
async function fetchMoviesByGenre(genreId) {
    const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
    const data = await response.json();
    displayMovies(data.results);
}

// Function to display movies in the genre section
function displayMovies(movies) {
    const container = document.getElementById('genre-movie-container');
    container.innerHTML = ''; // Clear the container

    if (movies.length === 0) {
        container.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>Rating: ${movie.vote_average}</p>
        `;
        container.appendChild(movieCard);
        movieCard.addEventListener('click',function(){
            window.location.href=`details.html?movieId=${movie.id}`
        });
    });
}



function performSearch() {
    const searchInput = document.getElementById('search-input').value;
    const apiKey = '06441985e67b0834a714e7433b1250ca'; // Replace with your API key
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

    // Display the search input in the results text
    const resultsText = document.getElementById('results-text');
    resultsText.textContent = `Results for: "${searchInput}"`;

    fetch(apiUrl)
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data for debugging
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            resultsText.textContent = 'Error fetching results. Please try again.';
        });
}

function displayMovies(movies) {
    const movieContainer = document.getElementById('search-movie-container');

    // Clear previous results
    movieContainer.innerHTML = '';

    if (movies.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'No results found.';
        movieContainer.appendChild(noResults);
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Display movie poster image
        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image.png';
        const movieImage = document.createElement('img');
        movieImage.src = posterPath;
        movieImage.alt = movie.title;

        // Display movie title
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        // Append elements to movie card
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);

        // Append movie card to the container
        movieContainer.appendChild(movieCard);
        movieCard.addEventListener('click',function(){
            window.location.href=`details.html?movieId=${movie.id}`
        });
    });
}


function toggleGenre(button) {
    // Remove 'active' class from all genre buttons
    const buttons = document.querySelectorAll('.genre-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    button.classList.add('active');
}

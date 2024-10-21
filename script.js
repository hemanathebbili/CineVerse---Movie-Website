const apiKey = '06441985e67b0834a714e7433b1250ca'; // Your TMDb API key
const baseUrl = 'https://api.themoviedb.org/3';

let fetchedMovies = []; // Store fetched movies for the slider

// Function to fetch movies
async function fetchMovies(category) {
    const response = await fetch(`${baseUrl}/${category}?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    return data.results.map(movie => ({
        id: movie.id,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`, // Use backdrop_path for the slider images
        title: movie.title || movie.name,
        rating: movie.vote_average,
    }));
}

// Function to display movies in the respective sections
function displayMovies(containerId, movies) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>Rating: ${movie.rating}</p>
        `;
        container.appendChild(movieCard);
        movieCard.addEventListener('click', function() {
            window.location.href = `details.html?movieId=${movie.id}`;
        });
    });
}

// Function to display movie images in the slider using backdrop_path
function displaySliderMovies(movies) {
    const movieSlider = document.getElementById("movie-slider");
    movieSlider.innerHTML = ""; // Clear previous slides

    movies.forEach(movie => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `
            <img src="${movie.backdrop}" alt="${movie.title}">
        `;
        movieSlider.appendChild(slide);
    });
}

// Function to automatically change slides
let currentIndex = 0;
function autoSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        currentIndex = (currentIndex + 1) % slides.length;
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }
}

// Function to initialize fetching of movies for all sections and slider
async function init() {
    try {
        const nowPlayingMovies = await fetchMovies('movie/now_playing');
        displayMovies('now-playing-movie-container', nowPlayingMovies);

        const popularMovies = await fetchMovies('movie/popular');
        displayMovies('popular-movie-container', popularMovies);

        const trendingMovies = await fetchMovies('trending/movie/day');
        displayMovies('trending-movie-container', trendingMovies);

        const upcomingMovies = await fetchMovies('movie/upcoming');
        displayMovies('upcoming-movie-container', upcomingMovies);

        // Combine all movies fetched into one array for the slider
        fetchedMovies = [...nowPlayingMovies, ...popularMovies, ...trendingMovies, ...upcomingMovies];
        displaySliderMovies(fetchedMovies);

        // Start the automatic slider
        setInterval(autoSlide, 3500); // Change slide every 3.5 seconds
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Call the init function when the page loads
window.onload = init;

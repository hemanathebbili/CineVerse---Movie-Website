



const apiKey = '06441985e67b0834a714e7433b1250ca'; // Replace with your TMDb API key
const baseUrl = 'https://api.themoviedb.org/3';

// Function to fetch movies
async function fetchMovies(category) {
    const response = await fetch(`${baseUrl}/${category}?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
}

// Function to display movies in the respective sections
function displayMovies(containerId, movies) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>Rating: ${movie.vote_average}</p>
        `;
        container.appendChild(movieCard);
    });
}

// Function to initialize fetching of movies for all sections
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
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Call the init function when the page loads
window.onload = init;




const movieImages = [
    {
        image: "Movie2.jpg", // Replace with actual image URLs
        title: "Movie 1",
    },
    {
        image: "avengers.jpg",
        title: "Movie 2",
    },
    {
        image: "Movie3.jpg",
        title: "Movie 3",
    },
    {
        image: "Movie4.jpg",
        title: "Movie 4",
    },
    {
        image: "Movie5.jpg",
        title: "Movie 5",
    },
    {
        image: "Movie6.jpg",
        title: "Movie 6",
    },
    {
        image: "Movie1.jpg",
        title: "Movie 7",
    }
];

let currentIndex = 0;

// Function to display movie images in the slider
function displaySliderMovies() {
    const movieSlider = document.getElementById("movie-slider");
    movieSlider.innerHTML = ""; // Clear previous slides

    movieImages.forEach(movie => {
        movieSlider.innerHTML += `
            <div class="slide">
                <img src="${movie.image}" alt="${movie.title}">
            </div>
        `;
    });
}

// Function to automatically change slides every 2 seconds
function autoSlide() {
    const slides = document.querySelector('.slides');
    currentIndex = (currentIndex + 1) % movieImages.length;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Initialize the slider on page load
displaySliderMovies();
setInterval(autoSlide, 3500); // Change slide every 2 seconds






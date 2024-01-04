// Get movie data from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieString = urlParams.get("movie");

if (movieString) {
  const movie = JSON.parse(movieString);

  // Update movie details on the page
  const movieDetails = document.querySelector(".movie-details");
  movieDetails.querySelector(".movie-image").src = movie.image;
  movieDetails.querySelector(".movie-name").textContent = movie.name;
  movieDetails.querySelector(
    ".release-year"
  ).textContent = `Released: ${movie.releaseYear}`;
  movieDetails.querySelector(".genre").textContent = `Genre: ${movie.genre}`;
  movieDetails.querySelector(".story").textContent = movie.about; // Use movie.about for the story
} else {
  console.error("Movie data not found in URL parameters");
}

// Close button listener
modal.querySelector(".close-button").addEventListener("click", function () {
  modal.style.display = "none";
});

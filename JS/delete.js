const MOVIES_KEY = "movie-data";

// Get the movie ID from the URL query parameter
const movieId = new URLSearchParams(window.location.search).get("movieId");

// Get the movie list from local storage
const movies = JSON.parse(localStorage.getItem(MOVIES_KEY)) || [];
console.log(movies);
// Find the index of the movie to delete
const movieIndex = movies.findIndex((movie) => movie.id === movieId);

// If the movie is found, proceed with deletion
if (movieIndex !== -1) {
  const confirmButton = document.getElementById("confirm-delete");
  const cancelButton = document.getElementById("cancel-delete");

  confirmButton.addEventListener("click", () => {
    // Remove the movie from the array
    movies.splice(movieIndex, 1);

    // Update local storage with the modified movie list
    localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));

    // Redirect back to the main page or a success page
    window.location.href = "index.html"; // Replace with your desired redirect path
  });

  cancelButton.addEventListener("click", () => {
    // Close the delete page or modal
    window.close(); // Assuming the delete page is in a separate window or tab
  });
} else {
  // Handle the case where the movie is not found
  console.error("Movie not found.");
  // You might want to display an error message to the user or redirect them back
}

const MOVIES_KEY = "movie-data";

document.addEventListener("DOMContentLoaded", function () {
  let movieToUpdate;
  try {
    const movieId = new URLSearchParams(window.location.search).get("movieId");
    console.log("movieId", movieId);
    // Fetch the entire movie object from local storage using the ID
    const movies = JSON.parse(localStorage.getItem(MOVIES_KEY)) || [];
    console.log("movies", movies);
    movieToUpdate = movies.find((movie) => movie.id === movieId);
    console.log("movieToupdate", movieToUpdate);
  } catch (error) {
    console.error("Error fetching movie:", error);
  }

  const form = document.getElementById("movie-form");
  const submitButton = document.getElementById("submit-button");
  // console.log("Form elements:", form);
  // console.log("Submit button:", submitButton);
  // Pre-fill form with movie data
  // try {
  //   // Ensure form elements exist before setting values
  //   if (
  //     form.elements.movieImage &&
  //     form.elements.movieName &&
  //     form.elements.releaseYear &&
  //     form.elements.movieGenre
  //   ) {
  //     form.elements.movieImage.value = movieToUpdate?.image;
  //     form.elements.movieName.value = movieToUpdate?.name;
  //     form.elements.releaseYear.value = movieToUpdate?.releaseYear;
  //     form.elements.movieGenre.value = movieToUpdate?.genre;
  //   } else {
  //     console.error("Form elements not found.");
  //   }
  // } catch (error) {
  //   console.error("Error pre-filling form:", error);
  // }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Update movie data with new values
    const updatedMovieData = {
      image:
        form &&
        form.elements &&
        form.elements.movieImage &&
        form.elements.movieImage.value,
      name:
        form &&
        form.elements &&
        form.elements.movieName &&
        form.elements.movieName.value,
      releaseYear:
        form &&
        form.elements &&
        form.elements.releaseYear &&
        form.elements.releaseYear.value,
      genre:
        form &&
        form.elements &&
        form.elements.genre &&
        form.elements.genre.value,
    };
    console.log(updatedMovieData);
    // // Update movie in local storage
    const movies = JSON.parse(localStorage.getItem(MOVIES_KEY)) || [];
    console.log(movies);
    const movieIndex = movies.findIndex(
      (movie) => movie.id === movieToUpdate.id
    );
    console.log(movieIndex);
    // if (movieIndex !== -1) {
    //   movies[movieIndex] = updatedMovieData;
    //   localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
    // }
    // // Optionally, close the update form window
    // // If you want to close the window after updating, uncomment the following line:
    // window.location.href = "index.html";

    // // alert message
    // alert("Movie updated successfully!");
  });
});

const MOVIES_KEY = "movie-data";

const addMoviesButton = document.getElementById("add-movies");
const formContainer = document.getElementById("form-container");
const movieForm = document.getElementsByClassName("modal-body");
const movieList = document.getElementById("movie-list");
const submitButton = document.getElementById("submit-button");

let movieCounter = 0;

// Submit form to add movie
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const movieName = document.getElementById("movie-name").value;
  const releaseYear = document.getElementById("release-year").value;
  const movieImage = document.getElementById("movie-image").value;
  const genre = document.getElementById("movie-genre").value;

  // Create movie object
  const movie = {
    name: movieName,
    releaseYear,
    image: movieImage,
    genre,
    id: "movie_" + movieCounter++,
  };
  console.log("movieid", movie.id);

  // Add movie to list and local storage
  addMovieToList(movie);

  // Get existing movies from local storage
  let movies = [];
  const moviesString = localStorage.getItem(MOVIES_KEY);
  //console.log("moviesString", moviesString);
  if (moviesString) {
    movies = JSON.parse(moviesString);
    //console.log("movies", movies);
  }
  // Add new movie to the array
  movies.push(movie);
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));

  // Close the modal
  // const modal = document.getElementById("movieModal");
  // modal.modal("hide");
});

function addMovieToList(movie) {
  // Create list item element
  const listItem = document.createElement("li");
  listItem.classList.add("movie");

  // Create and append movie details
  const imageEl = document.createElement("img");
  imageEl.src = movie.image;
  listItem.appendChild(imageEl);

  const movieNameEl = document.createElement("h3");
  movieNameEl.textContent = movie.name;
  listItem.appendChild(movieNameEl);

  const releaseYearEl = document.createElement("p");
  releaseYearEl.textContent = `Released: ${movie.releaseYear}`;
  releaseYearEl.style.margin = "0";
  listItem.appendChild(releaseYearEl);

  const genreEl = document.createElement("p");
  genreEl.textContent = `Genre: ${movie.genre}`;
  listItem.appendChild(genreEl);

  // Create and append update button
  const updateButton = document.createElement("button");
  updateButton.classList.add(
    "btn",
    "btn-sm",
    "btn-outline-warning",
    "update-button"
  );
  updateButton.textContent = "Update";

  listItem.appendChild(updateButton);

  // Create and append delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "btn",
    "btn-sm",
    "btn-outline-danger",
    "delete-button"
  );
  deleteButton.textContent = "Delete";

  listItem.appendChild(deleteButton);

  //create a View button
  const ViewButton = document.createElement("button");
  ViewButton.classList.add("btn", "btn-sm", "btn-outline-info", "view-button");
  ViewButton.textContent = "View";

  listItem.appendChild(ViewButton);

  addMovieListItemEventListeners(listItem, movie, movie.id);
  // Add list item to the movie list
  movieList.appendChild(listItem);
}

function addMovieListItemEventListeners(listItem, movie, id) {
  console.log("Passing movie ID to event listeners:", movie.id);
  const updateButton = listItem.querySelector(".update-button");
  updateButton.addEventListener("click", function () {
    // Open the update form in a new page
    window.open("../Html/update.html?movieId=" + movie.id, "_blank");
  });

  const deleteButton = listItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    // Remove from local storage and list
    localStorage.removeItem(id);
    movieList.removeChild(listItem);
  });

  const viewButton = listItem.querySelector(".view-button");
  viewButton.addEventListener("click", function () {
    const movieData = JSON.stringify(movie);
    window.open("../Html/view.html?movieId=" + movie.id, "_blank");
  });
}

// Load movies from local storage on page load
window.addEventListener("load", function () {
  const moviesString = localStorage.getItem(MOVIES_KEY);

  if (moviesString) {
    const movies = JSON.parse(moviesString);
    for (const movie of movies) {
      addMovieToList(movie);
    }
  }
});

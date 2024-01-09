const MOVIES_KEY = "movie-data";

const addMoviesButton = document.getElementById("add-movies");
const formContainer = document.getElementById("form-container");
const movieForm = document.getElementsByClassName("modal-body");
const movieList = document.getElementById("movie-list");
const submitButton = document.getElementById("submit-button");

let movieCounter = 0;
let movies = [
  {
    name: "Maaveeran",
    releaseYear: "2023",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcStM3HLQyCkcRrXD8hGHmg62nWo4aE8vqBZY6ayWqBGR97-6jnX",
    genre: "Action/Thriller",
    id: "movie_0",
  },
  {
    name: "Rangoli",
    releaseYear: "2023",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Rangoli2023tamil.jpg/220px-Rangoli2023tamil.jpg",
    genre: "Drama",
    id: "movie_1",
  },
  {
    name: "Pathu Thala",
    releaseYear: "2023",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRWyv6EJDOnAQ_iq2rtrEna3IvLP3VRXijbqxj8tkIW-lcpkdXr",
    genre: "Action/Thriller",
    id: "movie_2",
  },
  {
    name: "Paramporul",
    releaseYear: "2023",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTk6_XrMHFddBbQ2LAJ-B82jvZNB-Dlweg35EFVOcM3NEke0SHi",
    genre: "Thriller/Action",
    id: "movie_3",
  },
  {
    name: "Oh Manapenne!",
    releaseYear: "2021",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSV83ZYfoInT8GRg3UdXkmA6ikHMHxcXLcPxFWcjdhQvLlYMUnr",
    genre: "Romance/Comedy",
    id: "movie_4",
  },
  {
    name: "Good Night",
    releaseYear: "2023",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvl7V6ax8GDRCv8GiT3NFxepjOFS-b8vdYR2PHv3PRD-c-SH_Q",
    genre: "Comedy/Romance",
    id: "movie_5",
  },
];

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
    window.open(
      "/Movies-List-App/Html/update.html?movieId=" + movie.id,
      "_blank"
    );
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
    window.open(
      "/Movies-List-App/Html/view.html?movieId=" + movie.id,
      "_blank"
    );
  });
}

// Load movies from local storage on page load
window.addEventListener("load", function () {
  let moviesString = localStorage.getItem(MOVIES_KEY) || movies;
  if (!localStorage.getItem(MOVIES_KEY))
    moviesString = JSON.stringify(moviesString);
  //console.log("moviesString", moviesString);
  if (moviesString) {
    const movies = JSON.parse(moviesString);
    //console.log("movies", movies);
    for (const movie of movies) {
      addMovieToList(movie);
      //console.log("movie", movie);
    }
  }
});

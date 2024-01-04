const addMultipleMoviesButton = document.getElementById("add-multiple-movies");

// addMultipleMoviesButton.addEventListener("click", function () {
//   if (formContainer.classList.contains("hidden")) {
//     formContainer.classList.remove("hidden");
//     formContainer.style.display = "block";
//   } else {
//     formContainer.classList.add("hidden");
//     formContainer.style.display = "none";
//   }
// });

addMultipleMoviesButton.addEventListener("click", function () {
  formContainer.classList.toggle("show");
  formContainer.classList.toggle("hidden");
});

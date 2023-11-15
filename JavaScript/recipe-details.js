const articleContainer = document.querySelector(".article-container");
const uniqueTitle = document.getElementById("unique-title");

// search params to Fetch ID from specific blogpost(recipe)
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

//fetching API from my domain, together with the specific recipe.

const url =
  "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts/" + id;

async function fetchRecipe() {
  const response = await fetch(url);
  const myRecipe = await response.json();
  return myRecipe;
}

fetchRecipe;

async function renderRecipe() {
  const myRecipe = await fetchRecipe();
  console.log(myRecipe);

  if (myRecipe) {
    articleContainer.innerHTML += ` <h1>${myRecipe.title.rendered}</h1> ${myRecipe.content.rendered}`; //rendering full article with images and text from WP.
    uniqueTitle.innerHTML = `${myRecipe.title.rendered}`; // rendering unique title from API ID in HTML.
  }
}

renderRecipe();

function renderModal() {
  const modalElement = document.querySelector(".wp-block-image img");
  modalElement.addEventListener("click", modalOpen);
}

function modalOpen() {}

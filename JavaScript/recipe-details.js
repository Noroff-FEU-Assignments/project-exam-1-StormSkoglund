const articleContainer = document.querySelector(".article-container");

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
    articleContainer.innerHTML += `${myRecipe.content.rendered}`;
  }
}

renderRecipe();

const recipeList = document.querySelector(".recipe-container");

const url = "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts";

async function retrieveRecipes() {
  const response = await fetch(url);
  const recipes = await response.json();
  return recipes;
  console.log(recipes);
}

async function renderRecipes() {
  const recipePosts = await retrieveRecipes();
  console.log(recipePosts);

  const posts = recipePosts;

  posts.forEach((post) => {
    recipeList.innerHTML += `<a href="recipe-specific.html?id=${post.id}"><div class="card"><img class="api-image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}" ></img><p>${post.title.rendered}</p></div></a>`; //Sorting out images from the media endpoint for rendering.
  });
}

renderRecipes();

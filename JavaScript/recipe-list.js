const recipeList = document.querySelector(".recipe-container");
const showMorePosts = document.getElementById("show-more");

let url = "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts"; // I use let because I need to change the url later in this code.

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
    recipeList.innerHTML += `<a href="recipe-specific.html?id=${post.id}"><div class="card"><img class="api-image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}"></img><p>${post.title.rendered}</p></div></a>`; //Sorting out images from the media endpoint for rendering.  I am using the plugin "Better REST API Featured Images" for better access to images.
  });
}

renderRecipes();

showMorePosts.addEventListener("click", showMore);

async function showMore() {
  let url =
    "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts?page=2"; // Here I change the url to switch the page of posts, to allow more than ten to be rendered
  console.log(url);
  const response = await fetch(url);
  const newPage = await response.json();
  console.log(newPage);

  const addPosts = newPage;

  addPosts.forEach((addPost) => {
    recipeList.innerHTML += `<a href="recipe-specific.html?id=${addPost.id}"><div class="card"><img class="api-image" src="${addPost.better_featured_image.source_url}" alt="${addPost.better_featured_image.alt_text}"></img><p>${addPost.title.rendered}</p></div></a>`;
    showMorePosts.disabled = true; //I am disabling the button to prevent spamming, solution found at https://www.altcademy.com/blog/how-to-disable-a-button-in-javascript/[viewed at 15. november 2023].
  });
}

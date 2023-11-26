import { carouselRecipe } from "./modules/fetch-recipes.js";
import { tryCatchError } from "./modules/trycatcherror.js";

const carouselContent = document.getElementById("carousel-recipes");
const loader = document.querySelector(".loader");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const hamburgerMenu = document.querySelector("#Headerflex label i");

hamburgerMenu.addEventListener("click", function () {
  const navList = document.getElementById("nav-list");
  const navOpen = document.getElementById("nav-list");
  navList.style.visibility = "visible";
});

carouselRecipe();

async function renderRecipes() {
  try {
    const recipePosts = await carouselRecipe();
    console.log(recipePosts);
    loader.innerHTML = ``;

    const posts = recipePosts;

    posts.forEach((post) => {
      /*here I am using a method to render the date in more user friendly format, than the one that is fetched from the API. Available at https://stackoverflow.com/questions/58791663/how-to-modify-date-format-taken-from-wordpress-api[Viewed Nov 17. 2023]. And at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString[Viewed Nov 17. 2023]   */
      let renderDateFormatted = new Date(post.date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      );
      carouselContent.innerHTML += `<a href="recipe-specific.html?id=${post.id}"><div id="card"><img class="api-image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}"><p class="date">Posted on: ${renderDateFormatted}</p></img><p>${post.title.rendered}</p></div></a>`; //Sorting out images from the media endpoint for rendering.  I am using the plugin "Better REST API Featured Images" for better access to images.
    });
  } catch (error) {
    tryCatchError(error.message);
  }
}

renderRecipes();

tryCatchError();

next.addEventListener("click", goLeft);
function goLeft() {
  document.getElementById("carousel-recipes").style.backgroundColor = "white";
}

/*previous.addEventListener("click", goRight);
function goRight() {
  document.getElementById("carousel-recipes").style.a
}*/

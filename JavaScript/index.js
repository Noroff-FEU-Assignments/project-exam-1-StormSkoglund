import { carouselRecipe } from "./modules/fetch-recipes.js";
import { tryCatchError } from "./modules/trycatcherror.js";
const carouselSpinner = document.getElementById("spinner");
const loader = document.querySelector(".loader");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const hamburgerMenu = document.getElementById("burger");
const navList = document.getElementById("nav-list");
const clickClose = document.getElementById("click-close");

//hamburger menu open
hamburgerMenu.addEventListener("click", function () {
  navList.style.visibility = "visible";
  clickClose.style.visibility = "visible";
  hamburgerMenu.style.visibility = "hidden";
});
//hamburger menu close
clickClose.addEventListener("click", function () {
  navList.style.visibility = "hidden";
  clickClose.style.visibility = "hidden";
  hamburgerMenu.style.visibility = "visible";
});

carouselRecipe();

async function renderRecipes() {
  try {
    const recipePosts = await carouselRecipe();
    console.log(recipePosts);
    loader.innerHTML = ``;

    const posts = recipePosts;

    posts.forEach((post) => {
      carouselSpinner.innerHTML += `<img class="api-image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}">`; //Sorting out images from the media endpoint for rendering.  I am using the plugin "Better REST API Featured Images" for better access to images.
    });
  } catch (error) {
    tryCatchError(error.message);
  }
}

renderRecipes();

tryCatchError();

//carousel from Codepen

var angle = 0;
function galleryspin(sign) {
  spinner = document.querySelector("#spinner");
  if (!sign) {
    angle = angle + 45;
  } else {
    angle = angle - 45;
  }
  spinner.setAttribute(
    "style",
    "-webkit-transform: rotateY(" +
      angle +
      "deg); -moz-transform: rotateY(" +
      angle +
      "deg); transform: rotateY(" +
      angle +
      "deg);"
  );
}

/*next.addEventListener("click", goLeft);
function goLeft() {
  document.getElementById("carousel-recipes").style.backgroundColor = "white";
}

previous.addEventListener("click", goRight);
function goRight() {
  document.getElementById("carousel-recipes").style.a;
}*/

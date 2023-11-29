import { carouselRecipe } from "./modules/fetch-recipes.js";
import { tryCatchError } from "./modules/trycatcherror.js";
const carouselSpinner = document.querySelector(".api-images");
const loader = document.getElementById("loader");
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
    if (recipePosts) {
      loader.style.display = "none";
    }

    const posts = recipePosts;

    posts.forEach((post) => {
      carouselSpinner.innerHTML += `
      <a href="/HTML/recipe-specific.html?id=${post.id}"><img class="api-image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}"/img></a>
    `;
    });
  } catch (error) {
    tryCatchError(error.message);
  }
}

renderRecipes();

//This is my own JavaScript, that I have combined with a CSS only carousel from Codepen

const previous = document.querySelector(".prev");
const next = document.querySelector(".next");

next.addEventListener("click", function () {
  carouselSpinner.style.animation = "slides 6s forwards";
  console.log("yay");
});

previous.addEventListener("click", function () {
  carouselSpinner.style.animation = "slides-backwards 6s";
  console.log("huuray");
});

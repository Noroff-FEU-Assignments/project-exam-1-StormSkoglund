import { tryCatchError } from "./modules/trycatcherror.js";
const recipeList = document.querySelector(".recipe-container");
const showMorePosts = document.getElementById("show-more");
const noMorePosts = "You have reached the end of my recipe list :)";
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

/*function tryCatchError(message) {
  const renderError = document.querySelector(".error");
  renderError.innerHTML = `An error has occurred: ${message}`;
}*/

// This is an custom error i use in the very end, if the maximum numbers of pages has been reached.
function tryCatchSecondError() {
  const renderError = document.querySelector(".error");
  renderError.innerHTML = `${noMorePosts}`;
}

let url = "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts"; // I use let because I need to change the url later in this code.

async function retrieveRecipes() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      document.getElementById("loading").style.display = "none";
      throw new Error("failed to fetch recipe list.");
    }
    const recipes = await response.json();

    return recipes;
  } catch (error) {
    throw error;
  }
}

async function renderRecipes() {
  try {
    const recipePosts = await retrieveRecipes();
    document.getElementById("loading").style.display = "none";

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
      recipeList.innerHTML += `<a href="recipe-specific.html?id=${post.id}"><div class="card"><img class="api-image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}"><p class="date">Posted on: ${renderDateFormatted}</p></img><p>${post.title.rendered}</p></div></a>`; //Sorting out images from the media endpoint for rendering.  I am using the plugin "Better REST API Featured Images" for better access to images.
    });
  } catch (error) {
    tryCatchError(error.message);
  }
}

renderRecipes();

// The code below this adds more than 10 post to the list of recipes. when the user interact with a "Show More" button.

let clickCount = 1; // I am starting this counter from 1, since i am going to add a a new pages(beside the first that automatically render on start) to the url, every time I i click the "Show More button".

showMorePosts.addEventListener("click", function addingPages() {
  clickCount++;
  console.log(clickCount);
  localStorage.setItem("clicks", JSON.stringify(clickCount)); // saving the amount of clicks to localStorage
  showMore();
});

// Here I change the url to switch the page of posts, to allow more than ten recipes to be rendered

async function showMore() {
  try {
    const clicksCounted = localStorage.getItem("clicks"); // Fetching the amount of clicks, this amount will be combined with the newUrl, in the last section of this code

    // updating the URL with a new page number, created via the addEventListener above
    var newUrl =
      "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts?page=" +
      clicksCounted;
    console.log(newUrl);
    const response = await fetch(newUrl);
    const newPage = await response.json();
    console.log(newPage);

    const addPosts = newPage;

    addPosts.forEach((addPost) => {
      let renderDateFormatted = new Date(addPost.date).toLocaleDateString(
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
      recipeList.innerHTML += `<a href="recipe-specific.html?id=${addPost.id}"><div class="card"><img class="api-image" src="${addPost.better_featured_image.source_url}" alt="${addPost.better_featured_image.alt_text}"><p class="date">Posted on: ${renderDateFormatted}</p></img><p>${addPost.title.rendered}</p></div></a>`;
    });
  } catch (error) {
    tryCatchSecondError(error.noMorePosts);
  }
}

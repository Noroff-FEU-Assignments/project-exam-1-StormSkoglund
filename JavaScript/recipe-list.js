const recipeList = document.querySelector(".recipe-container");
const showMorePosts = document.getElementById("show-more");
const clicksCounted = localStorage.getItem("clicks"); // Fetching the amount of clicks, this amount will be combined with the newUrl, in the last section of this code

function tryCatchError(message) {
  const renderError = document.querySelector(".error");
  renderError.innerHTML = `An error has occurred: ${message}`;
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
    console.log(recipePosts);
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

// The code below this adds more than 10 post to the list of recipes. when the user interact with a "Show More" button.
renderRecipes();

let clickCount = 1; // I am starting this counter from 1, since i am going to add a a new pages(beside the first that automatically render on start) to the url, every time I i click the "Show More button".

showMorePosts.addEventListener("click", function addingPages() {
  clickCount++;
  console.log(clickCount);
  localStorage.setItem("clicks", JSON.stringify(clickCount)); // saving the amount of clicks to localStorage
  testClick();
});

// updating the URL with a new page number, created via the addEventListener above
var newUrl =
  "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts?page=" +
  clicksCounted;
console.log(newUrl);

function testClick() {
  try {
    let count = JSON.parse(
      localStorage.getItem("click", JSON.stringify(clickCount))
    );

    if (count > 2) {
      //there is a problem with this counter!!!!!!!
      showMore();
      console.log("true");
    } else {
      throw new Error(
        "You have reached the end of my recipe list for now, but don’t worry, I am cooking up some more delicious dishes for you. Stay tuned!."
      );
    }
  } catch (error) {
    tryCatchError(error.message);
  }
}

// Here I change the url to switch the page of posts, to allow more than ten to be rendered

async function showMore() {
  try {
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
    tryCatchError(error.message);
  }
}

/*if (clicksCounted >= 3) {
  showMorePosts.disabled = true; //I am disabling the button to prevent spamming, solution found at https://www.altcademy.com/blog/how-to-disable-a-button-in-javascript/[viewed on Nov 15. 2023].
}*/

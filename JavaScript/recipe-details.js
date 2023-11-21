const articleContainer = document.querySelector(".article-container");
const uniqueTitle = document.getElementById("unique-title");
const modalContainer = document.querySelector(".image-modal");
const modalClick = document.querySelector("img");

// Error renderering function, this works in combination with the Try Catch statement below
function tryCatchError(message) {
  const renderError = document.querySelector(".error");
  renderError.innerHTML = `An error has occurred: ${message}`;
}

// search params to Fetch ID from specific blogpost(recipe)
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

//fetching API from my domain, together with the specific recipe.

const url =
  "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts/" + id;

async function fetchRecipe() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      document.getElementById("loading").style.display = "none";
      throw new Error("failed to fetch recipe.");
    }
    const myRecipe = await response.json();
    return myRecipe;
  } catch (error) {
    throw error;
  }
}

fetchRecipe;

async function renderRecipe() {
  try {
    const myRecipe = await fetchRecipe();
    console.log(myRecipe);
    document.getElementById("loading").style.display = "none";

    if (myRecipe) {
      articleContainer.innerHTML += ` <h1>${myRecipe.title.rendered}</h1> ${myRecipe.content.rendered}`; //rendering full article with images and text from WP.
      uniqueTitle.innerHTML = `${myRecipe.title.rendered}`; // rendering unique title from API ID in HTML.
    }
  } catch (error) {
    tryCatchError(error.message);
  }
}

renderRecipe();

/* // Building a Modal.
async function fetchImageForModal() {
  const fetchModalImage = await fetchRecipe();
  if (fetchModalImage) {
    const modalImage = fetchModalImage;
    modalContainer.innerHTML = `<img id="${modalImage.better_featured_image.id}" src"${modalImage.better_featured_image.source_url}"</img>`;
  }
}
fetchImageForModal();

//Show modal when clicking on an image
modalClick.addEventListener("click", modalOpen);

function modalOpen() {
  modalContainer.showModal();
}*/

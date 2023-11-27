const articleContainer = document.querySelector(".article-container");
const uniqueTitle = document.getElementById("unique-title");
const modalContainer = document.querySelector(".image-modal");
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
/*const modalClick = document.querySelector(".image1");*/

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
    //selecting images for the modal.
    const images = document.querySelectorAll("img");

    images.forEach((image) => {
      image.addEventListener("click", function () {
        const clickImage = event.target.src;
        console.log(clickImage);
        createModal(clickImage);
      });
    });
  } catch (error) {
    tryCatchError(error.message);
  }
}

renderRecipe();

function createModal(src) {
  // Here I am creating the dialog together with the selected images in event.taget.src, then appending them to the DOM.
  const modal = document.createElement("dialog");
  document.querySelector("main").append(modal);

  const modalImage = document.createElement("img");
  modalImage.setAttribute("src", src); //Setting modal image attributes to match the event.target.src attribute from the clicked image, in order to copy its source.
  modal.append(modalImage);
  modal.showModal(); //showModal method available at https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal[Viewed Nov 26. 2023]
  modal.addEventListener("mouseout", function () {
    // mouseout used for exiting the Modal, available at https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event[Viewed on Nov 26. 2023]
    modal.close();
  });
}

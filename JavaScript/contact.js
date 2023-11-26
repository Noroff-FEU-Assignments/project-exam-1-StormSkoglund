/* This code is based on the method for form validation available at JavaScript 1, module 4 in the curriculum [viewed Nov 16. 2023]. */

/*Create a contact us page, there should be 4 textboxes on this page.
-	Name (Should be more than 5 characters long)
-	Email address (Must be a valid email address)
-	Subject (Should be more than 15 characters long)
-	Message content (Should be more than 25 characters long)*/

const nameInput = document.querySelector("#nameInput");
const nameError = document.querySelector("#nameError");
const emailInput = document.querySelector("#emailInput");
const emailError = document.querySelector("#emailError");
const subjectInput = document.querySelector("#subjectInput");
const subjectError = document.querySelector("#subjectError");
const messageBox = document.querySelector("#messageBox");
const messageError = document.querySelector("#messageError");
const contactForm = document.getElementById("contact");

function checkValidation(event) {
  //I will be using the same event.preventDefault as is used in JavaScript 1, module 4, to prevent that the default HTML for the form refreshes the page, when submitting the user inputs.
  event.preventDefault();

  //Combining the value.trim().length method from JavaScript 1, module 4, with innerHTML to generate the error message
  if (nameInput.value.trim().length < 5) {
    nameError.innerHTML = `Your name needs to be at least 5 characters long.`;
  } else {
    nameError.innerHTML = "";
  }

  if (subjectInput.value.trim().length < 15) {
    subjectError.innerHTML = `Subject text needs to be at least 15 characters long.`;
  } else {
    nameError.innerHTML = "";
  }

  if (messageBox.value.trim().length < 25) {
    messageError.innerHTML = `Your message needs to be at least 25 characters long.`;
  } else {
    nameError.innerHTML = "";
  }

  // I am using the same method for validating email as in JavaScript module 4.
  if (validateEmail(emailInput.value) === false) {
    emailError.innerHTML = `Not a valid email address.`;
  } else {
    nameError.innerHTML = "";
  }

  if (checkValidation) {
    window.alert(
      "Thank you for submission, I will read your message as soon as possible."
    );
    //reset contactform. Solution found at Tutorialspoint. Available at https://www.tutorialspoint.com/how-to-clear-the-form-after-submitting-in-javascript-without-using-reset[Viewed on Nov. 26 2023].
    contactForm.reset();
  }
}

contactForm.addEventListener("submit", checkValidation); // I use the same type of addEventListener as in JavaScript module 4, where the validation test is activated when the submit button is pressed.

function validateEmail(emailInput) {
  // I am using the method for pattern matching regular expressions, explained in module 4 to test my emailInput, which has been placed in the function argument.
  const regEx = /\S+@\S+\.\S+/;
  const searchPatternMatches = regEx.test(emailInput);
  return searchPatternMatches;
}

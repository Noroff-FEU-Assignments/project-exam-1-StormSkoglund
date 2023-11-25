export function tryCatchError(message) {
  const renderError = document.querySelector(".error");
  renderError.innerHTML = `An error has occurred: ${message}`;
}

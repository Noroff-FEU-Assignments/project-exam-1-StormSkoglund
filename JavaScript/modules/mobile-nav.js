const hamburgerMenu = document.querySelector("#Headerflex label i");

hamburgerMenu.addEventListener("click", function () {
  const navList = document.getElementById("#Headerflex ul");
  navList.style.display = "block";
});

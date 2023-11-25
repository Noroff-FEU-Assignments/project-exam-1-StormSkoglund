const url =
  "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts?filter[orderby]=date&order=desc";

export async function carouselRecipe() {
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

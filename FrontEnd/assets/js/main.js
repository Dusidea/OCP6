import { fetchWorks, addWork, removeWork } from "./work.js";
import { createFilter, filtering, fetchCategories } from "./category_filter.js";
import {} from "./modal.js";

//Display for admin mode
function editMode() {
  const banner = document.querySelector(".edit_header");
  const editButton = document.querySelector(".edit_button");
  banner.classList.remove("hidden");
  editButton.classList.remove("hidden");
}

//testing if user is logged
if (sessionStorage.myToken != null) {
  editMode();
  fetchWorks();

  const form = document.getElementById("addform");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    await addWork().then(() => {
      fetchWorks();
    });
  });

  //unlogged mode
} else {
  fetchWorks();
  fetchCategories().then(filtering);
  createFilter();
}

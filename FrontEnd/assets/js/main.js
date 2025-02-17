import { fetchWorks, addWork, removeWork } from "./work.js";
import { createFilter, filtering, fetchCategories } from "./category_filter.js";
import {} from "./modal.js";

function editMode() {
  const banner = document.querySelector(".edit_header");
  const editButton = document.querySelector(".edit_button");
  banner.classList.remove("hidden");
  editButton.classList.remove("hidden");
}

if (sessionStorage.myToken != null) {
  editMode();
  fetchWorks();

  //appel fonction d'ajout
  const form = document.getElementById("addform");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    await addWork().then(() => {
      fetchWorks();

      form.reset();
      const preview = document.getElementById("imagePreview");
      preview.classList.add("hidden");
      const blocPhoto = document.querySelector(".modal_form_button");
      blocPhoto.classList.remove("hidden");
      const modal = document.getElementById("modal1");
      modal.classList.add("hidden");
    });
  });
} else {
  fetchWorks();
  fetchCategories().then(filtering);
  createFilter();
}

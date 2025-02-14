import { displayWorks, addWork, removeWork } from "./work.js";
import {
  displayCategories,
  createFilter,
  filtering,
  fetchCategories,
} from "./category_filter.js";
import {} from "./modal.js";

async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }
    const works = await response.json();
    displayWorks(works);
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récuparation des travaux:",
      error
    );
  }
}

fetchWorks();

function editMode() {
  const banner = document.querySelector(".edit_header");
  const editButton = document.querySelector(".edit_button");
  banner.classList.remove("hidden");
  editButton.classList.remove("hidden");
}

if (sessionStorage.myToken != null) {
  editMode();
  fetchWorks().then(() => {
    //appel de la fonction de suppression
    const modalFigureList = document.querySelectorAll("#modal1 figure");
    modalFigureList.forEach((modalFigure) => {
      const trashIcon = modalFigure.lastChild;
      trashIcon.addEventListener("click", () => {
        console.log("XXX detection clic supression");
        removeWork(modalFigure);
      });
    });
  });

  //appel fonction d'ajout
  const form = document.getElementById("addform");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    await addWork().then(() => {
      fetchWorks();
      form.reset();
      console.log("XXXX  form reset");
      const preview = document.getElementById("imagePreview");
      preview.classList.add("hidden");
      const blocPhoto = document.querySelector(".modal_form_button");
      blocPhoto.classList.remove("hidden");
      const modal = document.getElementById("modal1");
      modal.classList.add("hidden");
    });
  });
} else {
  fetchCategories().then(filtering);
  createFilter();
}

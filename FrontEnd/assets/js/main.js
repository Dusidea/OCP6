import { displayWorks, addWork } from "./work.js";
import {
  displayCategories,
  createFilter,
  filtering,
  fetchCategories,
} from "./category_filter.js";
import {} from "./modal.js";

// Fonction pour récupérer les travaux de l'API
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const works = await response.json();
    displayWorks(works);

    console.log("Main: fetchworks : affichage des travaux");
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
  console.log("Main : test editmode connecté en tant qu'admin");
  editMode();
  await addWork();
} else {
  fetchCategories().then(filtering);

  createFilter();
  console.log("Main : test editmode NON connecté en tant qu'admin");
}

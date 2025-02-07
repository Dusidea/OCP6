import { displayWorks } from "./work.js";
import {
  displayCategories,
  createFilter,
  filtering,
  fetchCategories,
} from "./category_filter.js";
// import { login } from "./login.js";

import {} from "./modal.js";

function editMode() {
  const banner = document.querySelector(".edit_header");
  const editButton = document.querySelector(".edit_button");
  banner.classList.remove("hidden");
  editButton.classList.remove("hidden");
}

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

if (sessionStorage.myToken != null) {
  console.log("Main : test editmode connecté en tant qu'admin");
  editMode();
} else {
  fetchCategories().then(filtering);

  createFilter();
  console.log("Main : test editmode NON connecté en tant qu'admin");
}

import { displayWorks, addWork, removeWork } from "./work.js";
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
  fetchWorks().then(() => {
    //fonction de suppression **********************
    const modalFigureList = document.querySelectorAll("#modal1 figure");
    const modal = document.getElementById("modal1");
    console.log(
      "XXXX  MAIN taille list modalfigurelist" + modalFigureList.length
    );
    modalFigureList.forEach((modalFigure) => {
      const trashIcon = modalFigure.lastChild;
      trashIcon.addEventListener("click", () => {
        console.log("XXXX MAIN détection clic de suppression");
        removeWork(modalFigure);
        // modal.classList.add("hidden");
      });
    });
    //fin de fonction de suppression **********************
  });

  //fonction d'ajout**********************
  const form = document.getElementById("addform");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    await addWork().then(() => {
      console.log("Nouvelle figure ajoutée, appel de fetchworks()");
      fetchWorks();
      form.reset();
    });
  });
  //fin fonction ajout*************************
} else {
  fetchCategories().then(filtering);

  createFilter();
  console.log("Main : test editmode NON connecté en tant qu'admin");
}

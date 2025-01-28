import { displayWorks } from "./work.js";
import {
  displayCategories,
  createFilter,
  filtering,
} from "./category_filter.js";

async function fetchCategories() {
  try {
    const catResponse = await fetch("http://localhost:5678/api/categories");

    if (!catResponse.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const categories = await catResponse.json();
    displayCategories(categories);

    console.log("récupération des catégories");
  } catch (error) {
    console.error("Une erreur est survenue (catégories) :", error);
  }
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

    console.log("affichage des travaux");
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récuparation des travaux:",
      error
    );
  }
}

// Appelle la fonction au chargement de la page

fetchWorks();
fetchCategories().then(filtering);
createFilter();

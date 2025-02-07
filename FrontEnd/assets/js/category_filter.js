export async function fetchCategories() {
  try {
    const catResponse = await fetch("http://localhost:5678/api/categories");

    if (!catResponse.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const categories = await catResponse.json();

    if (
      sessionStorage.myToken == null &&
      document.querySelector(".filter").childElementCount < 2
    ) {
      displayCategories(categories);
      console.log(
        "Non connecté en tant qu'admin (current function = fetchcategories>displayCategrories"
      );
    } else {
      displayModalCategories(categories);
      console.log(
        "Oui connecté en tant qu'admin (current function = fetchcategories>displayMODALCategrories"
      );
    }

    console.log("récupération des catégories");
  } catch (error) {
    console.error("Une erreur est survenue (catégories) :", error);
  }
}

// création de l'élément filtre avec bouton all ?
export function createFilter() {
  const filterParent = document.getElementById("portfolio");
  const filter = document.createElement("div");
  filter.setAttribute("class", "filter");
  const button = document.createElement("button");
  button.innerHTML = `Tous`;
  button.setAttribute("id", "0");
  const gallery = document.querySelector(".gallery");
  filter.appendChild(button);
  filterParent.insertBefore(filter, gallery);
  console.log("CategoryFilter > createFilter : filtre créé");
}

// récupérer les categories et créer un bouton par category
export function displayCategories(categories) {
  categories.forEach((category) => {
    return new Promise((resolve) => {
      const button = document.createElement("button");
      button.innerHTML = `${category.name}`;
      button.setAttribute("id", category.id);

      const filter = document.querySelector(".filter");
      filter.appendChild(button);

      resolve();
    });
  });
  console.log(
    "CategoryFilter > displayCategories : boutons catégories filtre créés"
  );
}

export function displayModalCategories(categories) {
  categories.forEach((category) => {
    return new Promise((resolve) => {
      const dropdownCategory = document.getElementById("addform_categorie");
      const dropdownOption = document.createElement("option");
      console.log(
        "DisplayMODALcategories création d'une option de catégorie pour la modale :"
      );
      dropdownOption.setAttribute("value", category.name);
      dropdownOption.innerHTML = `${category.name}`;
      dropdownCategory.appendChild(dropdownOption);

      resolve();
    });
  });
  console.log("DisplayMODALcategories liste des catégories de la modale créée");
}

//Détection des clics sur les boutons et filtrage des résultats
export function filtering() {
  console.log("fonction filtering");
  const buttonList = document.querySelectorAll(".filter button");
  const figureList = document.querySelectorAll(".gallery figure");

  buttonList.forEach((button) => {
    button.addEventListener("click", () => {
      figureList.forEach((figure) => {
        figure.classList.remove("hidden");
      });

      buttonList.forEach((button) =>
        button.classList.remove("button-selected")
      );

      button.classList.add("button-selected");
      figureList.forEach((figure) => {
        const workCategory = figure.classList;
        if (button.id != "0" && workCategory != button.id) {
          figure.classList.add("hidden");
        }
      });
    });
  });
  console.log("fin fonction filtering");
}

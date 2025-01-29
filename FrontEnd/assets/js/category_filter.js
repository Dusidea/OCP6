import {} from "./work.js";

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
  console.log("filtre créé");
}

// récupérer les categories et créer un bouton par category
export function displayCategories(categories) {
  categories.forEach((category) => {
    return new Promise((resolve) => {
      const button = document.createElement("button");
      button.innerHTML = `${category.name}`;
      button.setAttribute("id", category.id);

      console.log("boutons catégories créés");
      const filter = document.querySelector(".filter");
      filter.appendChild(button);
      resolve();
    });
  });
}

//Détection des clics sur les boutons et filtrage des résultats
export function filtering() {
  console.log("fonction filtering");
  const buttonList = document.querySelectorAll("button");
  const figureList = document.querySelectorAll("figure");

  buttonList.forEach((button) => {
    console.log("bouton de la liste " + button.textContent);

    button.addEventListener("click", () => {
      figureList.forEach((figure) => {
        figure.classList.remove("hidden");
      });

      buttonList.forEach((button) =>
        button.classList.remove("button-selected")
      );
      console.log("clic");

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

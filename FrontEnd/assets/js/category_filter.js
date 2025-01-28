import {} from "./work.js";

// création de l'élément filtre avec bouton all ?
export function createFilter() {
  const filterParent = document.getElementById("portfolio");
  const filter = document.createElement("div");
  filter.setAttribute("class", "filter");
  const button = document.createElement("button");
  button.innerHTML = `Tous`;
  const gallery = document.querySelector(".gallery");
  filter.appendChild(button);
  filterParent.insertBefore(filter, gallery);
  console.log("filtre créé");
}

// j'essaie de récuperer les categories et créer un bouton par category

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

//selection de un empeche selection de l'autre
//si coché on cherche id de category +> j'anticipe en posant des id sur les objets boutons qui correspondent aux id du tableau ?

export function filtering() {
  console.log("fonction filtering");
  const buttonList = document.querySelectorAll("button");
  buttonList.forEach((button) => {
    console.log("bouton de la liste " + button.textContent);
    button.addEventListener("click", () => {
      console.log("clic");
    });
  });
  console.log("fin fonction filtering");
}

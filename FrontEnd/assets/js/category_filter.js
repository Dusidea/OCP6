//getting the list of categories from the database
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
    } else {
      displayModalCategories(categories);
    }
  } catch (error) {
    console.error("Une erreur est survenue (catégories) :", error);
  }
}

//creating the filter object
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
}

//creating the filter buttons => one per category
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
}

//creating the dropdown menu for the select category field
export function displayModalCategories(categories) {
  categories.forEach((category) => {
    return new Promise((resolve) => {
      const dropdownCategory = document.getElementById("addform_categorie");
      const dropdownOption = document.createElement("option");
      dropdownOption.setAttribute("value", category.id);
      dropdownOption.innerHTML = `${category.name}`;
      dropdownCategory.appendChild(dropdownOption);

      resolve();
    });
  });
}

//applying filters to works
export function filtering() {
  const buttonList = document.querySelectorAll(".filter button");
  const figureList = document.querySelectorAll(".gallery figure");
  const activeFilters = new Set();

  buttonList.forEach((button) => {
    button.addEventListener("click", () => {
      const filterCategory = button.id;

      if (filterCategory === "0") {
        activeFilters.clear();
        buttonList.forEach((btn) => btn.classList.remove("button-selected"));
      } else {
        if (activeFilters.has(filterCategory)) {
          activeFilters.delete(filterCategory);
          button.classList.remove("button-selected");
        } else {
          activeFilters.add(filterCategory);
          button.classList.add("button-selected");
        }
      }

      if (activeFilters.size === 0) {
        figureList.forEach((figure) => figure.classList.remove("hidden"));
      } else {
        let hasVisibleFigures = false;
        figureList.forEach((figure) => {
          const workCategory = figure.getAttribute("category");
          if (activeFilters.has(workCategory)) {
            figure.classList.remove("hidden");
            hasVisibleFigures = true;
          } else {
            figure.classList.add("hidden");
          }
        });

        if (!hasVisibleFigures) {
          figures.forEach((figure) => figure.classList.remove("hidden"));
        }
      }
    });
  });
}

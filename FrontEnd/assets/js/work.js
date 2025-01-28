// Fonction pour afficher les données dans le HTML (limite les rechargement de type paint du DOM)
export function displayWorks(works) {
  const list = document.querySelector(".gallery");
  list.innerHTML = "";
  const fragment = document.createDocumentFragment();

  works.forEach((work) => {
    if (work.imageUrl && work.title) {
      const figure = createFigureElement(work);
      fragment.appendChild(figure);
    }
  });

  list.appendChild(fragment);
}

// Fonction pour créer un élément de type "figure"
export function createFigureElement(work) {
  const figure = document.createElement("figure");

  const figureImage = document.createElement("img");
  figureImage.setAttribute("src", work.imageUrl);
  figureImage.setAttribute("alt", work.title);

  const figureTitle = document.createElement("figcaption");
  figureTitle.textContent = work.title;

  figure.appendChild(figureImage);
  figure.appendChild(figureTitle);

  return figure;
}

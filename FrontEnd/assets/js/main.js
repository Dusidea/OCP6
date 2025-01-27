// Fonction pour récupérer les données de l'API
async function fetchData() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const data = await response.json(); // Transforme la réponse en JSON
    displayData(data); // Appelle la fonction pour afficher les données
    console.log(data);
    console.log(data[0].title);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
}

// Fonction pour afficher les données dans le HTML
function displayData(items) {
  const list = document.querySelector(".gallery");

  //   Itère sur chaque élément
  items.forEach((item) => {
    const listItem = document.createElement("figure");
    const listImage = document.createElement("img");
    listItem.appendChild(listImage);
    const listTitle = document.createElement("figcaption");
    listItem.appendChild(listTitle);
    listImage.setAttribute("src", item.imageUrl);
    listImage.setAttribute("alt", item.title);
    listTitle.textContent = item.title;
    list.appendChild(listItem);
  });
}

// Appelle la fonction au chargement de la page
fetchData();

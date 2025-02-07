// Fonction pour afficher les données dans le HTML (limite les rechargement de type paint du DOM)
export function displayWorks(works) {
  const mainGallery = document.querySelector(".gallery");
  mainGallery.innerHTML = "";

  const modalGallery = document.querySelector(".modal-wrapper_gallery");
  modalGallery.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const galleryFragment = document.createDocumentFragment();

  works.forEach((work) => {
    if (work.imageUrl && work.title) {
      const figure = createFigureElement(work);
      fragment.appendChild(figure);

      const modalFigure = createModalFigure(work);
      galleryFragment.appendChild(modalFigure);
    }
  });

  mainGallery.appendChild(fragment);
  modalGallery.appendChild(galleryFragment);
}

// Fonction pour créer un élément de type "figure"
export function createFigureElement(work) {
  const figure = document.createElement("figure");

  const figureImage = document.createElement("img");
  figureImage.setAttribute("src", work.imageUrl);
  figureImage.setAttribute("alt", work.title);

  const figureTitle = document.createElement("figcaption");
  figureTitle.textContent = work.title;

  const category = work.category.id;

  figure.classList.add(category);

  figure.appendChild(figureImage);
  figure.appendChild(figureTitle);
  figure.setAttribute("workid", work.id);

  return figure;
}

export function createModalFigure(work) {
  const modalFigure = document.createElement("figure");

  const modalFigureImage = document.createElement("img");
  modalFigureImage.setAttribute("src", work.imageUrl);
  modalFigureImage.setAttribute("alt", work.title);
  modalFigure.appendChild(modalFigureImage);
  modalFigure.setAttribute("workid", work.id);
  //---------------------------
  const removeIcon = document.createElement("button");
  removeIcon.classList.add("remove_button");
  const trashCan = `<i class="fa-solid fa-trash-can"></i>`;
  removeIcon.innerHTML = trashCan;

  modalFigure.appendChild(removeIcon);
  const token = sessionStorage.getItem("myToken");
  // removeIcon.addEventListener("click", removeWork);
  // removeIcon.addEventListener("click", () => {
  //   console.log(
  //     "trying to remove work id : " + modalFigure.getAttribute("workid")
  //   );

  //   try {
  //     const removeResponse = fetch(
  //       "/http://localhost:5678/api/works/" +
  //         modalFigure.getAttribute("workid"),

  //       {
  //         method: "DELETE",
  //         headers: {
  //           Accept: "*/*",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!removeResponse.ok) {
  //       throw new Error(`Erreur : ${removeResponse.status}`);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Une erreur est survenue lors de la tentative de suppression du travail ",
  //       error
  //     );
  //     if (removeResponse == 200) {
  //       modalFigure.classList.add("hidden");
  //     }
  //   }
  // });

  //---------------------------
  console.log("modalFigureImage " + modalFigureImage);
  return modalFigure;
}

// async function removeWork() {
//   const modalFigureList = document.querySelectorAll("aside figure");
//   console.log("modal Figure List " + modalFigureList);

//   modalFigureList.forEach((modalFigure) => {
//     console.log("remove work boucle parcourant les figures");
//     const trashIcon = modalFigure.lastChild;
//     console.log("boutons " + trashIcon);
//     trashIcon.addEventListener("click", () => {
//       // try {
//       //   const removeResponse = fetch(
//       //     "http://localhost:5678/api/works/" +
//       //       modalFigure.getAttribute("workid")
//       //   );
//       //   if (!removeResponse.ok) {
//       //     throw new Error(`Erreur : ${removeResponse.status}`);
//       //   }
//       // } catch (error) {
//       //   console.error(
//       //     "Une erreur est survenue lors de la tentative de suppression du travail ",
//       //     error
//       //   );
//       // }
//       console.log("trying to remove work");
//     });
//   });
// }

// removeWork();

//ajout d'un nouveau projet
async function addWork() {
  const formData = new FormData();
  // const formTitle = document.getElementById("addform_titre");
  // const formCategory = document.getElementById("addform_categorie");
  formData.append("id", "5");
  formData.append("userId", "1");
  formElement = document.getElementById("addform");

  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5678/api/works");
  request.send(new formData(formElement));
}

// addWork();

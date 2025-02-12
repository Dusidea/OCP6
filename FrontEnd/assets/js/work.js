// Fonction pour afficher les données dans le HTML (limite les rechargement de type paint du DOM)
export function displayWorks(works) {
  console.log("entering displayworks");

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

  figure.setAttribute("category", category);

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
  // const token = sessionStorage.getItem("myToken");

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

function verifierChamp(champ) {
  // Si le champ est vide, on lance une exception
  if (champ.value === "") {
    throw new Error(`Le champ ${champ.id} est vide`);
  }
}

//ajout d'un nouveau projet
export async function addWork() {
  const form = document.getElementById("addform");
  const boutonValidation = document.getElementById("validate_add_button");

  //apercu de l'image
  const imageUpload = document.getElementById("addform_file");
  imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const preview = document.getElementById("imagePreview");
      preview.src = URL.createObjectURL(file);
      preview.classList.remove("hidden");
      const blocPhoto = document.querySelector(".modal_form_button");
      blocPhoto.classList.add("hidden");
    }
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    const image = formData.get("image");

    const titre = formData.get("title");
    const categorie = formData.get("category");

    const token = sessionStorage.getItem("myToken");
    if (image && titre && categorie) {
      boutonValidation.classList.remove("validate_add_button");
      console.log("condition existance des champs vérifiée");
    }
    try {
      verifierChamp(image);
      verifierChamp(titre);
      verifierChamp(categorie);

      return await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("projet ajouté");

      //DEBUT création manuelle de la nouvelle figure (KO)
      // const figure = document.createElement("figure");
      // const figureImage = document.createElement("img");
      // const imageUrl = "http://localhost:5678/images/" + image.name;
      // console.log("image url " + imageUrl);
      // figureImage.setAttribute("src", imageUrl);
      // figureImage.setAttribute("alt", titre);
      // const figureTitle = document.createElement("figcaption");
      // figureTitle.textContent = titre;

      // figure.setAttribute("category", categorie);
      // figure.appendChild(figureImage);
      // figure.appendChild(figureTitle);
      // const mainGallery = document.querySelector(".gallery");
      // mainGallery.appendChild(figure);

      //FIN création manuelle de la nouvelle figure (KO)
    } catch (error) {
      console.log("Une erreur est survenue : " + error.message);
    }
  });
}

// export function NewDisplayWorks() {
//   const mainGallery = document.querySelector(".gallery");

//   const modalGallery = document.querySelector(".modal-wrapper_gallery");

//   const fragment = document.createDocumentFragment();
//   const galleryFragment = document.createDocumentFragment();

//   const figure = createFigureElement(newWork);
//   fragment.appendChild(figure);

//   const modalFigure = createModalFigure(newWork);
//   galleryFragment.appendChild(modalFigure);

//   mainGallery.appendChild(fragment);
//   modalGallery.appendChild(galleryFragment);
// }

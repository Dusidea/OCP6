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
  return modalFigure;
}

export async function removeWork(modalFigure) {
  const token = sessionStorage.getItem("myToken");

  try {
    const response = await fetch(
      "http://localhost:5678/api/works/" + modalFigure.getAttribute("workid"),
      {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    modalFigure.classList.add("hidden");
    const mainFigures = document.querySelectorAll(".gallery figure");
    const modalWorkid = modalFigure.getAttribute("workid");
    mainFigures.forEach((mainFigure) => {
      const mainWorkid = mainFigure.getAttribute("workid");
      if (mainWorkid == modalWorkid) {
        mainFigure.classList.add("hidden");
      }
    });
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la tentative de suppression du travail ",
      error
    );
  }
}

function verifierChamp(champ) {
  if (champ.value === "") {
    throw new Error(`Le champ ${champ.id} est vide`);
  }
}

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

export async function addWork() {
  const form = document.getElementById("addform");
  const boutonValidation = document.getElementById("validate_add_button");
  const formData = new FormData(form);
  const image = formData.get("image");
  const titre = formData.get("title");
  const categorie = formData.get("category");
  const token = sessionStorage.getItem("myToken");
  if (image && titre && categorie) {
    boutonValidation.classList.remove("validate_add_button");
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
  } catch (error) {
    console.log("Une erreur est survenue : " + error.message);
  }
}

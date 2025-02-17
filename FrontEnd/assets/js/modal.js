import { fetchCategories, displayModalCategories } from "./category_filter.js";

let modal = null;
const modalWrappers = document.querySelectorAll(".modal-wrapper");

const openModal = function (event) {
  event.preventDefault();
  const target = document.getElementById("modal1");
  target.classList.remove("hidden");
  modal = target;
  const closeButtons = modal.querySelectorAll(".modal_close");
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", closeModal);
  });
  setTimeout(() => {
    document.addEventListener("click", closeOnOutsideClick);
  }, 100);
};

const closeModal = function (event) {
  if (modal === null) return;
  modal.classList.add("hidden");
  modal.removeEventListener("click", closeModal);
  modal = null;
};

function closeOnOutsideClick(event) {
  const clickedInsideModal = [...modalWrappers].some((wrapper) =>
    wrapper.contains(event.target)
  );
  if (!clickedInsideModal && !openButton.contains(event.target)) {
    event.stopPropagation();
    closeModal();
  }
}

const openButton = document.querySelector(".edit_button");
openButton.addEventListener("click", openModal);
const modalDelete = document.getElementById("modal_delete");
const modalAdd = document.getElementById("modal_add");
const buttonGoToAddView = document.getElementById("add_button");
const buttonGoToRemoveView = document.querySelector(".modal_return");

buttonGoToAddView.addEventListener("click", () => {
  modalAdd.classList.remove("hidden");
  modalDelete.classList.add("hidden");
});

buttonGoToRemoveView.addEventListener("click", (event) => {
  event.preventDefault();
  modalDelete.classList.remove("hidden");
  modalAdd.classList.add("hidden");
});

fetchCategories();

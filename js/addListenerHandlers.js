import { resetFilters } from "./resetFilters.js";
import { closeFilters } from "./closeFilters.js";
import { addToggleToTheBurgerButton } from "./addToggleToTheBurgerButton.js";
import { displaySortedUsers } from "./displaySortedUsers.js";

export function addListenerHandlers() {
  const allFilters = document.querySelector(".main__filters");
  const filterForm = document.querySelector(".filter_form");
  const filterButtons = document.querySelector(".filter__buttons");
  const burgerImage = document.querySelector(".burger_img");

  allFilters.addEventListener("input", function ({ target: radioButton }) {
    displaySortedUsers({ target: radioButton });
  });

  filterForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  filterButtons.addEventListener("click", function ({ target: button }) {
    resetFilters({ target: button });
    closeFilters({ target: button });
  });

  burgerImage.addEventListener("click", function () {
    addToggleToTheBurgerButton();
  });
}

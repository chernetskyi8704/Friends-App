export function closeFilters({ target: button }) {
  const burgerImage = document.querySelector(".burger_img");
  const filterBody = document.querySelector(".main__filters");
  const closeBurgerButton = document.querySelector(".close");

  if (button.classList.contains("close")) {
    document.body.classList.remove("_lock");
    burgerImage.classList.remove("_active");
    filterBody.classList.remove("_active");
    closeBurgerButton.classList.add("hidden");
  }
}

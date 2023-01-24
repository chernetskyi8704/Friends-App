export function addToggleToTheBurgerButton() {
  const burgerImage = document.querySelector(".burger_img");
  const filterBody = document.querySelector(".main__filters");
  const closeBurgerButton = document.querySelector(".close");

  document.body.classList.toggle("_lock");
  burgerImage.classList.toggle("_active");
  closeBurgerButton.classList.toggle("hidden");
  filterBody.classList.toggle("_active");
}

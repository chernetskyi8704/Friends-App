import { allUsers, displayAllUsers } from "./users.js";
import { currentFilterSettings } from "./currentFilterSettings.js";

export function resetFilters({ target: button }) {
  const inputTypeIsGenderAll = document.querySelector('input[value="all"]');
  const inputTypeIsGenderFemale = document.querySelector(
    'input[value="female"]'
  );
  const inputTypeIsGenderMale = document.querySelector('input[value="male"]');
  const inputSortAgeByIncreasing = document.querySelector(
    'input[value="ageAscending"]'
  );
  const inputSortAgeByDescending = document.querySelector(
    'input[value="ageDescending"]'
  );
  const inputSortNameByIncreasing = document.querySelector(
    'input[value="nameAscending"'
  );
  const inputSortNameByDescending = document.querySelector(
    'input[value="nameDescending"]'
  );
  const noUsersFoundElement = document.querySelector(".no-usersFound");
  const searchInput = document.querySelector('input[name="search"]');

  if (button.classList.contains("reset")) {
    displayAllUsers(allUsers);

    currentFilterSettings.selectedGender = "all";
    currentFilterSettings.currentSort = false;
    currentFilterSettings.inputText = false;
    searchInput.value = "";
    inputTypeIsGenderAll.checked = true;
    inputTypeIsGenderFemale.checked = false;
    inputTypeIsGenderMale.checked = false;
    inputSortAgeByIncreasing.checked = false;
    inputSortAgeByDescending.checked = false;
    inputSortNameByIncreasing.checked = false;
    inputSortNameByDescending.checked = false;
    if (!noUsersFoundElement.classList.contains("hidden")) {
      noUsersFoundElement.classList.add("hidden");
    }
  }
}

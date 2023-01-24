import { copyOfAllUsers } from "./displaySortedUsers.js";
import { currentFilterSettings } from "./currentFilterSettings.js";

export let currentArrayOfUsers = [];

let foundUsers = [];

function ifUsersNotFound() {
  const noUsersFoundElement = document.querySelector(".no-usersFound");
  currentArrayOfUsers.length === 0
    ? noUsersFoundElement.classList.remove("hidden")
    : noUsersFoundElement.classList.add("hidden");
}

export function defineCurrentArrayOfUsers() {
  const searchInput = document.querySelector('input[name="search"]');

  if (searchInput.value !== "") {
    currentFilterSettings.inputText = true;
    foundUsers = copyOfAllUsers.filter(
      user =>
        user.name.first
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }
  currentArrayOfUsers = searchInput.value !== "" ? foundUsers : copyOfAllUsers;
  ifUsersNotFound();
}

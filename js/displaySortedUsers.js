import { allUsers, displayAllUsers } from "./users.js";
import { allSortMethods } from "./sortMethods.js";
import { filterUsers } from "./filterUsers.js";
import { currentFilterSettings } from "./currentFilterSettings.js";
import { defineCurrentFilterSettings } from "./defineCurrentFilterSettings.js";
import {
  defineCurrentArrayOfUsers,
  currentArrayOfUsers,
} from "./defineCurrentArrayOfUsers.js";

export let copyOfAllUsers = [];
export function displaySortedUsers({ target: radioButton }) {
  copyOfAllUsers = [...allUsers];
  defineCurrentFilterSettings({ target: radioButton });
  defineCurrentArrayOfUsers();

  const filteredAndSortedUsers = !currentFilterSettings.currentSort
    ? filterUsers(currentArrayOfUsers, currentFilterSettings)
    : allSortMethods[currentFilterSettings.currentSort](
        filterUsers(currentArrayOfUsers, currentFilterSettings)
      );

  displayAllUsers(filteredAndSortedUsers);
}

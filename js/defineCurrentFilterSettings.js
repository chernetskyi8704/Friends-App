import { currentFilterSettings } from "./currentFilterSettings.js";

export function defineCurrentFilterSettings({ target: radioButton }) {
  if (radioButton.className.includes("gender")) {
    currentFilterSettings.selectedGender = radioButton.value;
  } else if (radioButton.className.includes("sort")) {
    currentFilterSettings.currentSort = radioButton.value;
  }
}

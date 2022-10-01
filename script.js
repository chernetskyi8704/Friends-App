const listOfUsers = document.querySelector(".users");

const allFilters = document.querySelector(".main__filters");
const resetBtn = document.querySelector(".resetBtn");

const genderChoosenAll = document.querySelector('input[value="all"]');
const genderChoosenMale = document.querySelector('input[value="male"]');
const genderChoosenFemale = document.querySelector('input[value="female"]');

const searchInput = document.querySelector('input[name="search"]');

const usersURL =
  "https://randomuser.me/api/?results=16&nat=ua&inc=gender,name,location,picture,dob&seed=1 noinfo";

let allUsers = [];
let copyOfAllUsers = [];

const getUsersData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allUsers = [...data.results];
    displayAllUsers(allUsers);
  } catch (err) {
    console.log("Error");
  }
};
getUsersData(usersURL);

const displayAllUsers = (usersArray) => {
  listOfUsers.innerHTML = "";
  usersArray.map((user) => {
    const html = ` <li class="user">
      <div class="user_photo">
        <img src=${user.picture.large} alt="" class="user_img" />
      </div>
      <div class="user_description">
        <h2 class="user_name">${user.name.first} ${user.name.last}, ${user.dob.age}</h2>
        <span class="user_location data">Location: ${user.location.city}</span>
      </div>
      <div class="user_manipulate">
        <img src="img/add-user.png" alt="" class="img_manipulate" />
        <img
          src="img/broken-heart.png"
          alt=""
          class="img_manipulate img_broken"
        />
        <img
          src="img/red-heart.png"
          alt=""
          class="img_manipulate img_liked hidden"
        />
        <img src="img/email.png" alt="" class="img_manipulate" />
      </div>
    </li>`;
    listOfUsers.insertAdjacentHTML("beforeend", html);
  });
};

let rules = ["", false, false, false, false];

let sortingRules = {
  filterByGenderIsChoosed: "all",
  ageByDescendingIsChecked: false,
  ageByIncreasingIsChecked: false,
  nameByDescendingIsChecked: false,
  nameByIncreasingIsChecked: false,
};

const initializeUsers = (target) => {
  copyOfAllUsers = [...allUsers];

  if (genderChoosenMale.checked) {
    sortingRules.filterByGenderIsChoosed = "male";
  }
  if (genderChoosenFemale.checked) {
    sortingRules.filterByGenderIsChoosed = "female";
  }
  if (genderChoosenAll.checked) {
    sortingRules.filterByGenderIsChoosed = "all";
  }
  if (target.value === "0-9" && target.checked) {
    sortingRules.ageByIncreasingIsChecked = true;
    sortingRules.ageByDescendingIsChecked = false;

    sortingRules.nameByIncreasingIsChecked = false;
    sortingRules.nameByDescendingIsChecked = false;
  }
  if (target.value === "9-0" && target.checked) {
    sortingRules.ageByDescendingIsChecked = true;
    sortingRules.ageByIncreasingIsChecked = false;
    sortingRules.nameByIncreasingIsChecked = false;
    sortingRules.nameByDescendingIsChecked = false;
  }
  if (target.value === "A-z" && target.checked) {
    sortingRules.nameByIncreasingIsChecked = true;
    sortingRules.nameByDescendingIsChecked = false;
    sortingRules.ageByIncreasingIsChecked = false;
    sortingRules.ageByDescendingIsChecked = false;
  }
  if (target.value === "Z-a" && target.checked) {
    sortingRules.nameByDescendingIsChecked = true;
    sortingRules.nameByIncreasingIsChecked = false;
    sortingRules.ageByIncreasingIsChecked = false;
    sortingRules.ageByDescendingIsChecked = false;
  }

  if (
    sortingRules.ageByIncreasingIsChecked ||
    sortingRules.ageByDescendingIsChecked
  ) {
    displayAllUsers(
      sortByAge(
        filterfilterByGenderIsChoosed(copyOfAllUsers, sortingRules),
        sortingRules
      )
    );
  } else if (
    sortingRules.nameByIncreasingIsChecked ||
    sortingRules.nameByDescendingIsChecked
  ) {
    displayAllUsers(
      sortByAlphabets(
        filterfilterByGenderIsChoosed(copyOfAllUsers, sortingRules),
        sortingRules
      )
    );
  } else if (
    sortingRules.filterByGenderIsChoosed === "all" ||
    sortingRules.filterByGenderIsChoosed === "male" ||
    sortingRules.filterByGenderIsChoosed === "female"
  ) {
    displayAllUsers(
      filterfilterByGenderIsChoosed(copyOfAllUsers, sortingRules)
    );
  }
};

const filterfilterByGenderIsChoosed = (arrayOfUsers, sortingRules) => {
  if (
    sortingRules.filterByGenderIsChoosed === "male" ||
    sortingRules.filterByGenderIsChoosed === "female"
  ) {
    arrayOfUsers = arrayOfUsers.filter(
      (user) => user.gender === sortingRules.filterByGenderIsChoosed
    );
    return arrayOfUsers;
  } else if (sortingRules.filterByGenderIsChoosed === "all") {
    return arrayOfUsers;
  }
};

const sortByAge = (arrayOfUsers, sortingRules) => {
  if (sortingRules.ageByIncreasingIsChecked) {
    arrayOfUsers.sort((a, b) => a.dob.age - b.dob.age);
  } else {
    arrayOfUsers.sort((a, b) => b.dob.age - a.dob.age);
  }
  return arrayOfUsers;
};

const sortByAlphabets = (arrayOfUsers, sortingRules) => {
  if (sortingRules.nameByIncreasingIsChecked) {
    arrayOfUsers.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
  } else {
    arrayOfUsers.sort((a, b) => (a.name.first > b.name.first ? -1 : 1));
  }
  return arrayOfUsers;
};

allFilters.addEventListener("input", function (e) {
  const target = e.target;

  if (searchInput.value !== "") {
    const findUser = copyOfAllUsers.filter(
      (user) =>
        user.name.first
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    displayAllUsers(findUser);
  } else {
    initializeUsers(target);
  }
});

resetBtn.addEventListener("click", function () {
  displayAllUsers(allUsers);
  sortingRules = {
    filterByGenderIsChoosed: "all",
    ageByIncreasingIsChecked: false,
    ageByDescendingIsChecked: false,
    nameByIncreasingIsChecked: false,
    nameByDescendingIsChecked: false,
  };
  searchInput.value = "";
});

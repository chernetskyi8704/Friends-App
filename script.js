const listOfUsers = document.querySelector(".users");
const allFilters = document.querySelector(".main__filters");
const resetButton = document.querySelector(".resetBtn");
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

let sortingRules = {
  filterByGenderIsChoosed: "all",
  ageByDescendingIsChecked: false,
  ageByIncreasingIsChecked: false,
  nameByDescendingIsChecked: false,
  nameByIncreasingIsChecked: false,
};

const defineSortingRules = (target) => {
  switch (target.value) {
    case "male":
      sortingRules.filterByGenderIsChoosed = "male";
      break;

    case "female":
      sortingRules.filterByGenderIsChoosed = "female";
      break;

    case "all":
      sortingRules.filterByGenderIsChoosed = "all";
      break;

    case "0-9":
      sortingRules.ageByIncreasingIsChecked = true;
      sortingRules.ageByDescendingIsChecked = false;
      sortingRules.nameByIncreasingIsChecked = false;
      sortingRules.nameByDescendingIsChecked = false;
      break;

    case "9-0":
      sortingRules.ageByDescendingIsChecked = true;
      sortingRules.ageByIncreasingIsChecked = false;
      sortingRules.nameByIncreasingIsChecked = false;
      sortingRules.nameByDescendingIsChecked = false;
      break;

    case "A-z":
      sortingRules.nameByIncreasingIsChecked = true;
      sortingRules.nameByDescendingIsChecked = false;
      sortingRules.ageByIncreasingIsChecked = false;
      sortingRules.ageByDescendingIsChecked = false;
      break;

    case "Z-a":
      sortingRules.nameByDescendingIsChecked = true;
      sortingRules.nameByIncreasingIsChecked = false;
      sortingRules.ageByIncreasingIsChecked = false;
      sortingRules.ageByDescendingIsChecked = false;
      break;
  }
};

const dispalySortedUsers = function (target) {
  copyOfAllUsers = [...allUsers];
  defineSortingRules(target);

  if (searchInput.value !== "") {
    const findUser = copyOfAllUsers.filter(
      (user) =>
        user.name.first
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    if (
      sortingRules.ageByIncreasingIsChecked ||
      sortingRules.ageByDescendingIsChecked
    ) {
      displayAllUsers(
        sortByAge(filterByGender(findUser, sortingRules), sortingRules)
      );
    } else if (
      sortingRules.nameByIncreasingIsChecked ||
      sortingRules.nameByDescendingIsChecked
    ) {
      displayAllUsers(
        sortByAlphabets(filterByGender(findUser, sortingRules), sortingRules)
      );
    } else {
      displayAllUsers(filterByGender(findUser, sortingRules));
    }
  } else if (
    sortingRules.ageByIncreasingIsChecked ||
    sortingRules.ageByDescendingIsChecked
  ) {
    displayAllUsers(
      sortByAge(filterByGender(copyOfAllUsers, sortingRules), sortingRules)
    );
  } else if (
    sortingRules.nameByIncreasingIsChecked ||
    sortingRules.nameByDescendingIsChecked
  ) {
    displayAllUsers(
      sortByAlphabets(
        filterByGender(copyOfAllUsers, sortingRules),
        sortingRules
      )
    );
  } else if (sortingRules.filterByGenderIsChoosed) {
    displayAllUsers(filterByGender(copyOfAllUsers, sortingRules));
  }
};

const filterByGender = (arrayOfUsers, sortingRules) => {
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
    arrayOfUsers.sort(
      (firstUser, secondUser) => firstUser.dob.age - secondUser.dob.age
    );
  } else {
    arrayOfUsers.sort(
      (firstUser, secondUser) => secondUser.dob.age - firstUser.dob.age
    );
  }
  return arrayOfUsers;
};

const sortByAlphabets = (arrayOfUsers, sortingRules) => {
  if (sortingRules.nameByIncreasingIsChecked) {
    arrayOfUsers.sort((firstUser, secondUser) =>
      firstUser.name.first > secondUser.name.first ? 1 : -1
    );
  } else {
    arrayOfUsers.sort((firstUser, secondUser) =>
      firstUser.name.first > secondUser.name.first ? -1 : 1
    );
  }
  return arrayOfUsers;
};

allFilters.addEventListener("input", function (e) {
  const target = e.target;
  dispalySortedUsers(target);
});

resetButton.addEventListener("click", function () {
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

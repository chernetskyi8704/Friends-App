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
    copyOfAllUsers = [...allUsers];
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
  byGender: "all",
  ageByDescending: false,
  ageByIncreasing: false,
  nameByDescending: false,
  nameByIncreasing: false,
};

const initializeUsers = (target) => {
  if (genderChoosenMale.checked) {
    sortingRules.byGender = "male";
  }
  if (genderChoosenFemale.checked) {
    sortingRules.byGender = "female";
  }
  if (genderChoosenAll.checked) {
    sortingRules.byGender = "all";
  }
  if (target.value === "0-9" && target.checked) {
    sortingRules.ageByIncreasing = true;
    sortingRules.ageByDescending = false;

    sortingRules.nameByIncreasing = false;
    sortingRules.nameByDescending = false;
  }
  if (target.value === "9-0" && target.checked) {
    sortingRules.ageByDescending = true;
    sortingRules.ageByIncreasing = false;
    sortingRules.nameByIncreasing = false;
    sortingRules.nameByDescending = false;
  }
  if (target.value === "A-z" && target.checked) {
    sortingRules.nameByIncreasing = true;
    sortingRules.nameByDescending = false;
    sortingRules.ageByIncreasing = false;
    sortingRules.ageByDescending = false;
  }
  if (target.value === "Z-a" && target.checked) {
    sortingRules.nameByDescending = true;
    sortingRules.nameByIncreasing = false;
    sortingRules.ageByIncreasing = false;
    sortingRules.ageByDescending = false;
  }

  if (sortingRules.ageByIncreasing || sortingRules.ageByDescending) {
    displayAllUsers(
      sortByAge(filterByGender(copyOfAllUsers, sortingRules), sortingRules)
    );
  } else if (sortingRules.nameByIncreasing || sortingRules.nameByDescending) {
    displayAllUsers(
      sortByAlphabets(
        filterByGender(copyOfAllUsers, sortingRules),
        sortingRules
      )
    );
  } else if (
    sortingRules.byGender === "all" ||
    sortingRules.byGender === "male" ||
    sortingRules.byGender === "female"
  ) {
    displayAllUsers(filterByGender(copyOfAllUsers, sortingRules));
  }
};

const filterByGender = (arrayOfUsers, sortingRules) => {
  if (sortingRules.byGender === "male" || sortingRules.byGender === "female") {
    arrayOfUsers = arrayOfUsers.filter(
      (user) => user.gender === sortingRules.byGender
    );
    return arrayOfUsers;
  } else if (sortingRules.byGender === "all") {
    return arrayOfUsers;
  }
};

const sortByAge = (arrayOfUsers, sortingRules) => {
  if (sortingRules.ageByIncreasing) {
    arrayOfUsers.sort((a, b) => a.dob.age - b.dob.age);
  } else {
    arrayOfUsers.sort((a, b) => b.dob.age - a.dob.age);
  }
  return arrayOfUsers;
};

const sortByAlphabets = (arrayOfUsers, sortingRules) => {
  if (sortingRules.nameByIncreasing) {
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
    byGender: "all",
    ageByIncreasing: false,
    ageByDescending: false,
    nameByIncreasing: false,
    nameByDescending: false,
  };
  searchInput.value = "";
});

export function filterUsers (arrayOfUsers, { selectedGender } = currentFilterSettings) {
  if (selectedGender !== "all") {
    return arrayOfUsers.filter(user => user.gender === selectedGender);
  } else {
    return arrayOfUsers;
  }
};

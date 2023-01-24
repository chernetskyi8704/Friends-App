const compareAge = (firstUser, secondUser) => {
  return firstUser.dob.age - secondUser.dob.age;
};

const compareName = (firstUser, secondUser) => {
  return firstUser.name.first > secondUser.name.first ? 1 : -1;
};

export const allSortMethods = {
  nameDescending: arr => {
    return arr.sort((a, b) => compareName(b, a));
  },
  nameAscending: arr => {
    return arr.sort(compareName);
  },
  ageDescending: arr => {
    return arr.sort((a, b) => compareAge(b, a));
  },
  ageAscending: arr => {
    return arr.sort(compareAge);
  },
};

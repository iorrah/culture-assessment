let hasOnlyUniqueIds = (arr) => {
  let i,
      id,
      ids = [],
      unique = true,
      lengthArr = arr.length;

  for (i = 0; i < lengthArr; i++) {
    id = arr[i].id;

    if (ids.indexOf(id) > -1) {
      unique = false;
      break;
    }

    ids.push(id);
  }

  return unique;
};

export default hasOnlyUniqueIds;

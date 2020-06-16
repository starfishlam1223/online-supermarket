function searchInItems(array, keyword) {
  console.log(array);
  console.log(keyword);
  let result = [];

  array.forEach(element => {
    let distance = getEditDistance(element.name, keyword);
    let similarity = element.name.length - distance;

    if (similarity > 0) {
      element["similarity"] = similarity;
      result.push(element);
      console.log(element);
    }
  });

  result.sort(function(a, b){return b.similarity - a.similarity});
  console.log(result);

  return result;
}
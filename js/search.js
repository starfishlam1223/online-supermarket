function searchInItems(array, keyword) {
  let result = [];

  array.forEach(element => {
    let distance = getEditDistance(element.name, keyword);
    let longerWord = Math.max(element.name.length, keyword.length)
    let similarity = (longerWord - distance) + (longerWord - distance) / element.name.length;

    if (similarity > 0) {
      element["similarity"] = similarity;
      result.push(element);
    }
  });

  result.sort(function(a, b){return b.similarity - a.similarity});

  return result;
}
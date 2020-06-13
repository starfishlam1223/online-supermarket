var getParams = new URLSearchParams(window.location.search);
var subCat;
var page = 1;

$(document).ready(function () {
  if (getParams.has('subCat')) {
    subCat = getParams.get('subCat')
    if (getParams.has('page')) {
      page = getParams.get('page')
    }

    $(".page .items .prev").click(function() {
      window.location.replace("./items.html?subCat=" + subCat + "&page=" + (parseInt(page) - 1));
    });
    $(".page .items .next").click(function() {
      window.location.replace("./items.html?subCat=" + subCat + "&page=" + (parseInt(page) + 1));
    });

    d3.csv("./static/csv/subCategories.csv").then(function (array) {
      array.forEach(function (item) {
        console.log(subCat);
        console.log(item.id);

        if (item.id == subCat) {
          $(".page .subCatTitle p").text(item.name);
          console.log(item.name);
        }
      });
    });

    d3.csv("./static/csv/items.csv").then(function (array) {
      let items = [];

      array.forEach(function (item) {
        if (item.subCatId == subCat) {
          items.push(item);
        }
      });

      let start = (page - 1) * 8
      let end = page * 8

      if (start != 0) {
        $(".page .items .prev").css('visibility', 'visible');
      } else {
        $(".page .items .prev").css('visibility', 'hidden');
      }

      if (end < items.length) {
        $(".page .items .next").css('visibility', 'visible');
      } else {
        $(".page .items .next").css('visibility', 'hidden');
      }

      items.forEach(function (item, index) {
        if (index >= start && index < end) {
          $(".page .items .grids").append(`
          <div class="item" itemId="` + item.id + `">
            <img src="` + item.src + `">
            <div class="title">` + item.name + `</div>
          </div>
          `);
        }
      });
    });
  } else {
    window.location.replace("./index.html");
  }
});
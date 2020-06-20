var getParams = new URLSearchParams(window.location.search);
var suggests = [];
var page = 1;

$(document).ready(function () {
  d3.csv("./static/csv/items.csv").then(function (array) {
    $(".page .items .prev").click(function () {
      window.location.href = "./index.html?page=" + (parseInt(page) - 1);
    });
    $(".page .items .next").click(function () {
      window.location.href = "./index.html?page=" + (parseInt(page) + 1);
    });

    var useCurrentSuggest = false;
    if (localStorage.getItem("suggests") !== null) {
      var currentSuggest = JSON.parse(localStorage.getItem("suggests"));

      var suggestDate = currentSuggest.date;
      var now = moment().format("YYYY-MM-DD");
      if (suggestDate == now) {
        useCurrentSuggest = true;
      }
    }

    if (useCurrentSuggest) {
      suggests = currentSuggest.items;
    } else {
      let range = [...Array(array.length).keys()];

      for (i = 0; i < 8; i++) {
        if (range.length > 0) {
          var num = Math.floor(Math.random() * range.length);
          suggests.push(range[num]);
          range.splice(num, 1);
        }
      }

      var suggestJson = { date: now, items: suggests };

      localStorage.setItem("suggests", JSON.stringify(suggestJson));
    }

    let items = [];

    array.forEach(function (item) {
      suggests.forEach(function (suggestId) {
        if (item.id == suggestId) {
          items.push(item);
        }
      });
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

        $(".page .items .grids .item[itemId=" + item.id + "]").click(function () {
          window.location.href = "./item.html?item=" + item.id;
        });
      }
    });
  });
});
var getParams = new URLSearchParams(window.location.search);
var result = [];
var page = 1;

$(document).ready(function () {
  if (getParams.has('keyword')) {
    keyword = getParams.get('keyword');
    if (getParams.has('page')) {
      page = getParams.get('page');
    }

    $(".subCatTitle p").text("\"" + keyword + "\"的搜尋結果");

    $(".page .items .prev").click(function () {
      window.location.replace("./result.html?keyword=" + keyword + "&page=" + (parseInt(page) - 1));
    });
    $(".page .items .next").click(function () {
      window.location.replace("./result.html?keyword=" + keyword + "&page=" + (parseInt(page) + 1));
    });

    d3.csv("./static/csv/items.csv").then(function (array) {
      let items = searchInItems(array, keyword);

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

      if (items.length === 0) {
        $(".page .items .grids").append(`
        <div class="not-found">
          <div class="image">
            <img src="./static/png/not-found.png">
          </div>
          <div class="desc">
            <p>沒有找到產品</p>
          </div>
        </div>
        `);
      } else {
        items.forEach(function (item, index) {
          if (index >= start && index < end) {
            $(".page .items .grids").append(`
              <div class="item" itemId="` + item.id + `">
                <img src="` + item.src + `">
                <div class="title">` + item.name + `</div>
              </div>
              `);

            $(".page .items .grids .item[itemId=" + item.id + "]").click(function () {
              window.location.replace("./item.html?item=" + item.id);
            });
          }
        });
      }
    });
  } else {
    window.location.replace("./index.html");
  }
});
var inMenuBtn = false;
var inMenu = false;
var inMenuItem = false;

var selectedCat = -1;

$(document).ready(function () {
  d3.csv("https://raw.githubusercontent.com/starfishlam1223/online-supermarket/master/static/csv/catorgories.csv").then(function (array) {
    array.forEach(function(item) {
      $(".menu > .list").append(`
        <li class="item" catId="` + item.id + `">
          <div class="icon">
            <img src="` + item.src + `">
          </div>
          <div class="name">
            ` + item.name + `
          </div>
          <div class="arrow">
            <img src="./static/svg/arrow.svg">
          </div>
        </li>
      `);

      $(".menu .list li").hover(function() {
        let id = $(this).attr("catId");
        selectedCat = id;
        $(".menu > .list li[catId=" + id + "] .icon img").css("filter", "invert(57%) sepia(15%) saturate(2279%) hue-rotate(168deg) brightness(103%) contrast(91%)");
        $(".menu > .list li[catId=" + id + "] .name").css("color", "#3fa7f3");
        $(".menu > .list li[catId=" + id + "] .arrow img").css("opacity", "1");
        d3.csv("https://raw.githubusercontent.com/starfishlam1223/online-supermarket/master/static/csv/subCatorgories.csv").then(function (array) {
          $(".sub-menu > .list").empty();
          array.forEach(function(item) {
            if (item.catId === id) {
              $(".sub-menu > .list").append(`
                <li class="item" catId="` + item.id + `">
                  <div class="icon">
                    <img src="` + item.src + `">
                  </div>
                  <div class="name">
                    ` + item.name + `
                  </div>
                </li>
              `);
            }
          });
          $(".sub-menu .list li").hover(function() {
            let id = $(this).attr("catId");
            $(".sub-menu .list li[catId=" + id + "] .name").css("color", "#3fa7f3");
          }, function() {
            let id = $(this).attr("catId");
            $(".sub-menu .list li[catId=" + id + "] .name").css("color", "#4a4a4a");
          })
          
          $(".sub-menu").show();
        });
      }, function() {
        let id = $(this).attr("catId");
        selectedCat = -1;
        $(".menu > .list li[catId=" + id + "] .icon img").css("filter", "invert(23%) sepia(37%) saturate(0%) hue-rotate(183deg) brightness(99%) contrast(84%)");
        $(".menu > .list li[catId=" + id + "] .name").css("color", "#4a4a4a");
        $(".menu > .list li[catId=" + id + "] .arrow img").css("opacity", "0");
      })
    });
  });

  $(".menu-btn img").hover(function() {
    $(".menu").show();
    inMenuBtn = true;
  }, function() {
    inMenuBtn = false;
    if (!inMenuBtn && !inMenuBtn) {
      $(".menu").hide();
      $(".sub-menu").hide();
    }
  })

  $(".menu").hover(function() {
    $(".menu").show();
    inMenu = true;
  }, function() {
    inMenu = false;
    if (!inMenuBtn && !inMenuBtn) {
      $(".menu").hide();
      $(".sub-menu").hide();
    }
  })
})
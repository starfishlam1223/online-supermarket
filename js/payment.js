var shoppingCart;

$(document).ready(function () {
  shoppingCart = getCart();

  d3.csv("./static/csv/items.csv").then(function (array) {
    shoppingCart.forEach(function (element) {
      array.forEach(function (item) {
        if (element.id == item.id) {
          element.price = parseFloat(item.price);
          element.src = item.src;
          element.name = item.name;
          element.info = item.info;
        }
      });
    });

    shoppingCart.forEach(function (item) {
      $(".page .content .items .list").append(`
        <div class="item" itemId="` + item.id + `">
          <div class="image">
            <img src="` + item.src + `">
          </div>
          <div class="desc">
            <p class="name">` + item.name + `</p>
            <p class="unit">` + item.info + `</p>
          </div>
          <div class="unit-price">
            <p>HK$` + item.price.toFixed(2) + `</p>
          </div>
          <div class="quantity">
            <p>` + item.quantity + `</p>
          </div>
          <div class="price">
            <p>HK$` + (item.price * item.quantity).toFixed(2) + `</p>
          </div>
        </div>
      `);
    });

    let totalPrice = 0;
    shoppingCart.forEach(function (item) {
      totalPrice += item.quantity * item.price;
    });
    $(".info .price .total-price").text("HK$" + totalPrice.toFixed(2));

    $(".page .content .title .numberOfItems").text(shoppingCart.length + "項商品");
  });

  $(".info .pay").click(function () {
    localStorage.setItem("cart", "[]");

    window.location.replace("./complete.html");
  })
});
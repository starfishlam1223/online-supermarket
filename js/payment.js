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

    if (shoppingCart.length === 0) {
      $(".page .content .items .list").append(`
      <div class="emptyCart">
        <div class="image">
          <img src="./static/png/empty.png">
        </div>
        <div class="desc">
          <p>您的購物車尚未加入任何商品</p>
        </div>
      </div>
      `);
      $(".info .pay").attr("disabled", "disabled");
    } else {
      shoppingCart.forEach(function (item) {
        $(".page .content .items .list").append(`
          <div class="item" itemId="` + item.id + `">
            <div class="image">
              <img src="` + item.src + `">
            </div>
            <div class="product-right">
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
          </div>
        `);
      });  
    }

    let totalPrice = 0;
    shoppingCart.forEach(function (item) {
      totalPrice += item.quantity * item.price;
    });
    $(".info .price .total-price").text("HK$" + totalPrice.toFixed(2));

    $(".page .content .title .numberOfItems").text(shoppingCart.length + "項商品");
  });

  $(".info .pay").click(function () {
    localStorage.setItem("cart", "[]");

    window.location.href = "./complete.html";
  })
});
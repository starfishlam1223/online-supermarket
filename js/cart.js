var cart = []

$(document).ready(function () {
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  $(".cart-btn .border").attr('quantity', cart.length);
});

function updateCart(newItem) {
  let existItem = false;
  cart.forEach(function (item) {
    if (item.id == newItem.id) {
      existItem = true;
      item.quantity = parseInt(item.quantity) + parseInt(newItem.quantity);
    }
  });
  if (!existItem) {
    cart.push(newItem);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  $(".cart-btn .border").attr('quantity', cart.length);
}

function getCart() {
  return cart;
}
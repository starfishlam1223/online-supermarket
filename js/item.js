var getParams = new URLSearchParams(window.location.search);
var itemId;
var quantity;

$(document).ready(function () {
  quantity = $(".page .details .info .input input").val();

  $(".page .details .info .input .minus").click(function () {
    quantity = $(".page .details .info .input input").val();
    $(".page .details .info .input input").val(parseInt(quantity) - 1);
    $(".page .details .info .input input").trigger("change");
  });

  $(".page .details .info .input .add").click(function () {
    quantity = $(".page .details .info .input input").val();
    $(".page .details .info .input input").val(parseInt(quantity) + 1);
    $(".page .details .info .input input").trigger("change");
  });

  if (quantity > 1) {
    $(".page .details .info .input .minus").removeAttr("disabled");
  } else {
    $(".page .details .info .input .minus").attr('disabled', 'disabled');
  }

  $(".page .details .info .input input").on("change paste keyup", function () {
    quantity = $(".page .details .info .input input").val();

    if (parseInt(quantity) > 1) {
      $(".page .details .info .input .minus").removeAttr("disabled");
    } else {
      $(".page .details .info .input .minus").attr('disabled', 'disabled');
    }
  });

  if (getParams.has('item')) {
    itemId = getParams.get('item');
    d3.csv("./static/csv/items.csv").then(function (array) {
      array.forEach(function (item) {
        if (item.id == itemId) {
          $(".page .title .name").text(item.name);
          $(".page .title .desc").text(item.info);
          $(".page .details .image img").attr("src", item.src);
          $(".page .details .info .price").text("HK$" + parseFloat(item.price).toFixed(2));

          $(".page .details .info .confirm").click(function () {
            let newItem = { id: item.id, quantity: $(".page .details .info .input input").val() };
            updateCart(newItem);

            let popupId = $(".page .details .popups .popup").length
            $(".page .details .popups").append(`
            <span
              class="popup"
              popupId="` + popupId + `"
            >
              已將` + item.name + `×` + $(".page .details .info .input input").val() + `加入購物車
            </span>
            `);
            let popupDiv = $(".page .details .popups .popup[popupId=" + popupId + "]");
            popupDiv.addClass("show");

            hidePopup(popupDiv);
          })
        }
      });
    });
  } else {
    window.location.replace("./index.html");
  }
});

function hidePopup(popupDiv) {
  setTimeout(function () {
    popupDiv.removeClass("show");
  }, 3000);
}
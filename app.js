(function () {
  "use strict";

  var shoppingList = [
    {
      name: "cookies",
      quantity: 12,
    },
    {
      name: "chips",
      quantity: 5,
    },
    {
      name: "cola",
      quantity: 2,
    },
    {
      name: "ice-cream",
      quantity: 4,
    },
    {
      name: "donuts",
      quantity: 10,
    },
  ];

  angular
    .module("shoppingList", [])
    .controller("toBuyController", toBuyController)
    .controller("alreadyBoughtController", alreadyBoughtController)
    .service("shoppingService", shoppingService);

  //Controllers

  toBuyController.$inject = ["shoppingService"];
  function toBuyController(shoppingService) {
    var itemDisplay = this;
    itemDisplay.items = shoppingService.getItems();
    itemDisplay.removeItem = function (index) {
      shoppingService.removeItem(index);
    };

    itemDisplay.buyItem = function (index) {
      shoppingService.buyItem(index);
    };
  }

  alreadyBoughtController.$inject = ["shoppingService"];
  function alreadyBoughtController(shoppingService) {
    var boughtList = this;

    boughtList.items = shoppingService.getBoughtList();
  }

  // Service
  function shoppingService() {
    var service = this;
    var items = shoppingList;
    var bought = [];

    service.getItems = function () {
      return items;
    };

    service.buyItem = function (index) {
      var item = items[index];
      bought.push(item);
      items.splice(index, 1);
    };

    service.getBoughtList = function () {
      return bought;
    };
  }
})();

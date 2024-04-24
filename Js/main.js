
var app = new Vue({
    el: "article",
    data: {
        products: [
            { id: 1, title: "ВИНОГРАД СУВЕНІР ", short_text: "(масою 300 г)", image: "sajency-vinograd-suvenir-3-saj_1.jpg", desc: "very very sweet and tasty grapes" },
            { id: 2, title: "КИШМИШ ПРОМЕНИСТИЙ ", short_text: "(700-900 г) ", image: "vinograd-kishmish-luchistyy-3_1 (1).jpg", desc: "very very sweet and tasty grapes" },
            { id: 3, title: "МАКСІ ЧОРНИЙ ", short_text: "(масою до 4 г) ", image: "sajency-vinograd-maksi-cherniy-3-saj_1.jpg", desc: "very very sweet and tasty grapes" },
            { id: 4, title: "ПРЕОБРАЖЕННЯ ", short_text: "(досягає 1,5 кг )", image: "sajency-vinograd-preobrajenie-3-saj_1.jpg", desc: "very very sweet and tasty grapes" },
            { id: 5, title: "АРКАДІЯ ", short_text: "(400-500 г )", image: "vinograd-arkadiya_1.jpg", desc: "Full desc" }
        ],

        product: {},
        btnVisible: 0,
        cart:[],
        contactFields:[],
        orderPlaced: false,
    },
    mounted: function () {
        console.log(window.localStorage.getItem('prod'));
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods: {
        addItem: function (id) {
            window.localStorage.setItem('prod', id);
        },

        getProduct: function () {
            if (window.location.hash) {
              var id = window.location.hash.replace("#", "");
              if (this.products && this.products.length > 0) {
                for (i in this.products) {
                  if (
                    this.products[i] && this.products[i].id && id == this.products[i].id
                  )
                    this.product = this.products[i];
                }
              }
            }
          },

          addToCart: function (id) {
            var cart = [];
            if (window.localStorage.getItem("cart")) {
              cart = window.localStorage.getItem("cart").split(",");
            }
            if (cart.indexOf(String(id)) == -1) {
              cart.push(id);
              window.localStorage.setItem("cart", cart.join());
              this.btnVisible = 1;
            }

            console
          },

          checkInCart: function () {
            if (
              this.product &&
              this.product.id &&
              window.localStorage
                .getItem("cart")
                .split(",")
                .indexOf(String(this.product.id)) != -1
            )
              this.btnVisible = 1;
          },

          getCart: function () {
            var cart = [];
            if (window.localStorage.getItem("cart")) {
              console.log("localStorage", window.localStorage.getItem("cart"));
                var cartsId = window.localStorage.getItem("cart").split(",");
                console.log("getCart: function", cartsId);
                
                cartsId.forEach(id => {
                    var foundProduct = this.products.find(product => product.id.toString() === id);
                    if (foundProduct) {
                        cart.push(foundProduct);
                    }
                });
            }
            this.cart = cart;
            console.log(this.cart, "this.cart");
        },

        removeFromCart: function (id) {
          for (var i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === id) {
                this.cart.splice(i, 1);
                break; 
            }
        }
        var cartsId = [];
        for (var j = 0; j < this.cart.length; j++) {
            cartsId.push(this.cart[j].id); 
        }
          window.localStorage.setItem("cart", cartsId.join());
          console.log("delete cart", this.cart);
      },
        
      makeOrder: function () {
        window.localStorage.removeItem("cart");
        this.cart = [];
        this.orderPlaced = true;
      },
    },
    
});

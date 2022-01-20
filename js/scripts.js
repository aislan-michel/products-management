const validations = {
     string: {
          isNullOrEmpty: (val) => {
               const isNull = () => val === null;
               const isEmpty = () => val === '';

               return isNull() || isEmpty();
          }
     },
     number: {
          isGreaterThanZero: (num) => {
               return num > 0;
          }
     }
}

class Product {
     constructor(name, cateogry, price) {
          this.id = utils.randomNumber();
          this.name = name;
          this.category = cateogry;
          this.price = price;
          this.isValid = false;
          this.notifications = [];

     }

     validate() {
          if (validations.string.isNullOrEmpty(this.name)) {
               this.notifications.push("name invalid");
          }

          if (validations.string.isNullOrEmpty(this.category)) {
               this.notifications.push("category invalid");
          }

          if (!validations.number.isGreaterThanZero(this.price)) {
               this.notifications.push("price invalid");
          }

          this.isValid = this.notifications.length === 0;
     }
}

const utils = {
     randomNumber: () => Math.floor(Math.random() * 256324568),
     navigation: {
          goToReadPage: () => window.location.href = '/pages/read.html',
     },
     DOM: {
          getValueById: (id) => document.getElementById(id).value
     }
}

const repository = {
     localStorageKey: "uma-chave-qualquer",
     get: () => JSON.parse(localStorage.getItem(this.localStorageKey)) ?? [{
          id: 1,
          name: "computer",
          category: "eletronic",
          price: 1999.99
     }],
     set: (products) => localStorage.setItem(this.localStorageKey, JSON.stringify(products))
}

const operations = {
     create: (name, category, price) => {
          const product = new Product(name, category, price);

          product.validate();

          if (!product.isValid) {
               return product;
          }

          let products = repository.get();

          products.push(product);

          repository.set(products);

          return product;
     },
     read: () => {
          return repository.get();
     },
     update: () => { },
     delete: () => { }
}

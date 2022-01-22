class Product {
     constructor(name, category, price) {
          this.id = utils.randomNumber();
          this.name = name;
          this.category = category;
          this.price = price;
          this.isValid = false;
          this.notifications = [];
          this.validate();
     }

     validate() {
          if (validations.string.isNullOrEmpty(this.name)) {
               this.notifications.push({ key: "name", message: "name invalid" });
          }

          if (validations.string.isNullOrEmpty(this.category)) {
               this.notifications.push({ key: "category", message: "category invalid" });
          }

          if (!validations.number.isGreaterThanZero(this.price)) {
               this.notifications.push({ key: "price", message: "price invalid" });
          }

          this.isValid = this.notifications.length === 0;
     }

     update(product) {
          const { name, category, price } = product;

          this.name = name;
          this.category = category;
          this.price = price;
     }
}

class ProductRepository {
     constructor() {
          this.localStorageKey = "product-key";
     }

     get() {
          return JSON.parse(localStorage.getItem(this.localStorageKey)) ?? [{
               id: 1,
               name: "computer",
               category: "eletronic",
               price: 1999.99
          }];
     }
     set(products) {
          localStorage.setItem(this.localStorageKey, JSON.stringify(products));
     }
}

class ProductService {
     constructor() {
          this.repository = new ProductRepository();
     }

     create(product) {
          let products = this.repository.get();

          products.push(product);

          this.repository.set(products);
     }

     update(product) {
          const { id, name, category, price } = product;

          let products = this.repository.get();
          let productToUpdate = products.filter(x => x.id == Number(id))[0];

          products = products.filter(x => x.id !== Number(id));

          productToUpdate.name = name;
          productToUpdate.category = category;
          productToUpdate.price = price;

          products.push(productToUpdate);

          this.repository.set(products);
     }

     delete(id) {
          let products = this.repository.get();

          products = products.filter(x => x.id !== Number(id));

          this.repository.set(products);
     }
}

const validations = {
     string: {
          isNullOrEmpty: (val) => {
               const isNull = () => val === null;
               const isEmpty = () => val === '';

               return isNull() || isEmpty();
          }
     },
     number: {
          isGreaterThanZero: (num) => num > 0
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

const notificationHelper = {
     showNotifications: (notifications) => {
          notifications.forEach(n => {
               let divOfNotification = document.getElementById(`${n.key}-notification`);

               divOfNotification.innerText = n.message;
          });
     },
     resetNotifications: () => {
          const ids = [
               "name",
               "category",
               "price"
          ];

          ids.forEach(x => {
               let divOfNotification = document.getElementById(`${x}-notification`);

               divOfNotification.innerText = '';
          });
     }
}

const service = new ProductService();
const repository = new ProductRepository();

const operations = {
     create: (name, category, price) => {
          const product = new Product(name, category, price);

          if (!product.isValid) {
               return product;
          }

          service.create(product);

          return product;
     },
     read: {
          all: () => repository.get(),
          one: (id) => repository.get().find(x => x.id == id)

     },
     update: (id, name, category, price) => {
          let product = new Product(name, category, price);

          product.id = id;

          if (!product.isValid) {
               return product;
          }

          service.update(product);

          return product;
     },
     delete: (id) => {
          service.delete(id);
     }
}

const localStorageKey = "uma-chave-qualquer";

const repository = {
     get: () => JSON.parse(localStorage.getItem(localStorageKey)) ?? [{
          id: 1,
          name: "computer",
          category: "eletronic",
          price: 1999.99
     }],
     set: (products) => localStorage.setItem(localStorageKey, JSON.stringify(products))
}

const utils = {
     randomNumber: () => Math.floor(Math.random() * 256324568),
     goToReadPage: () => window.location.href = '/pages/read.html'
}

const extensions = {
     string: {
          isNullOrEmpty: (val) => {
               const isNull = () => val === null;
               const isEmpty = () => val === '';

               switch (val) {
                    case isNull():
                         return true;
                    case isEmpty():
                         return true;
                    default:
                         return false;
               }
          }
     },
     number: {
          isGreaterThanZero: (num) => {
               return num > 0;
          }
     }
}

const operations = {
     create: () => {
          const { string } = extensions;

          const name = document.getElementById("name").value;

          if (string.isNullOrEmpty(name)) {
               //retorna erro;
          }

          const category = document.getElementById("category").value;

          if (string.isNullOrEmpty(category)) {
               //retorna erro;
          }

          const price = document.getElementById("price").value;

          const id = utils.randomNumber();

          const product = { id, name, category, price };

          let products = repository.get();

          products.push(product);

          repository.set(products);

          utils.goToReadPage();
     },
     read: () => {
          return repository.get();
     },
     update: () => { },
     delete: () => { }
}

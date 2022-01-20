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
     randomNumber: () => Math.floor(Math.random() * 256324568)
}

const operations = {
     create: () => {
          debugger;
          let products = repository.get();

          const id = utils.randomNumber();
          const name = document.getElementById("name").value;
          const category = document.getElementById("category").value;
          const price = document.getElementById("price").value;

          const product = { id, name, category, price };

          products.push(product);

          repository.set(products);
     },
     read: () => {
          return repository.get();
     },
     update: () => { },
     delete: () => { }
}

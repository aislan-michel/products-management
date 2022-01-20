let products = [];

function create() {
     const name = document.getElementById("name").value;
     const category = document.getElementById("category").value;
     const price = document.getElementById("price").value;

     products.push({ name, category, price });

     console.log(products.length)
}

function read() {
     return products;
}

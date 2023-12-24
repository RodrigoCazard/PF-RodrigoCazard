const productos = [
  { id: "1", nombre: "Yerba", precio: 50, category: "desktop", stock: 4 },
  { id: "2", nombre: "Fideos", precio: 150, category: "laptop", stock: 6 },
  {
    id: "3",
    nombre: "Coquita",
    precio: 250,
    category: "mobilePhone",
    stock: 2,
  },
  { id: "4", nombre: "Arroz", precio: 350, category: "laptop", stock: 8 },
  { id: "5", nombre: "Arroz", precio: 350, category: "laptop", stock: 4 },
  { id: "6", nombre: "Arroz", precio: 350, category: "desktop", stock: 23 },
  { id: "7", nombre: "Arroz", precio: 350, category: "mobilePhone", stock: 12 },
  { id: "8", nombre: "Arroz", precio: 350, category: "desktop", stock: 9 },
  { id: "9", nombre: "Arroz", precio: 350, category: "printer", stock: 2 },
  { id: "10", nombre: "Arroz", precio: 350, category: "others", stock: 76 },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    resolve(productos);
  });
};

export const getFirstEightProducts = () => {
  return new Promise((resolve) => {
    let firstEight = [];
    for (let i = 1; i <= 8; i++) {
      firstEight.push(productos[i]);
    }

    resolve(firstEight);
  });
};
export const getProductCategories = (idCategory) => {
  return new Promise((resolve) => {
    const productCategory = productos.filter(
      (item) => item.category === idCategory
    );
    resolve(productCategory);
  });
};

export const getUnProducto = (id) => {
  return new Promise((resolve) => {
    const producto = productos.find((item) => item.id === id);
    resolve(producto);
  });
};

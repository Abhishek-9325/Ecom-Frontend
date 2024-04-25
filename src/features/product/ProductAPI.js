export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchProductsById(id) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/products/${id}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/categories");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/brands");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchAllFilterProducts(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategory = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategory}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=${admin}&`;
  }
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/products?${queryString}`);
    const data = await res.json();
    const totalItems = await res.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function addProduct(product) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

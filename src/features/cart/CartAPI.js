export function addToCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function updateCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/cart/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function deleteCart(itemId) {
  return new Promise(async (resolve) => {
    console.log(itemId);
    const res = await fetch(`http://localhost:8080/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    resolve({ data: itemId });
  });
}

export function fetchCartItemsByUserID(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/cart?user=${userId}`);
    const data = await res.json();
    resolve({ data });
  });
}

export async function resetCart(userId) {
  return new Promise(async (resolve) => {
    const res = await fetchCartItemsByUserID(userId);
    const items = await res.data;
    items.forEach(async (item) => {
      await deleteCart(item.id);
    });
    resolve({ status: "success" });
  });
}

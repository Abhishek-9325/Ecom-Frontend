export function fetchOrderByUserID(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/orders?user=${userId}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchUserData(userID) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/user/${userID}`);
    const data = await res.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/user/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

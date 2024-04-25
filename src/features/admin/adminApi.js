// A mock function to mimic making an async request for data
export function createUser(user) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function updateUser(updateItem) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8080/user/${updateItem.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateItem),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function getUser({ email, password }) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`http://localhost:8080/user?email=${email}`);
    const data = await res.json();
    console.log(data[0]);
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User Not Found" });
    }
  });
}

export function signOut(userID) {
  return new Promise(async (resolve) => {
    resolve({ data: `${userID} Successfully Logged Out` });
  });
}

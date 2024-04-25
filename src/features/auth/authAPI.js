// A mock function to mimic making an async request for data
export function createUser(user) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/auth/signup", {
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

// export function updateUser(updateItem) {
//   return new Promise(async (resolve) => {
//     const res = await fetch(`http://localhost:8080/user/${updateItem.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(updateItem),
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     const data = await res.json();
//     console.log(data);
//     resolve({ data });
//   });
// }

export function getUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        resolve({ data });
      } else {
        reject({ message: "Invalid Credentials" });
      }
    } catch (err) {
      reject({ message: err });
    }
  });
}

export function signOut(userID) {
  return new Promise(async (resolve) => {
    resolve({ data: `${userID} Successfully Logged Out` });
  });
}

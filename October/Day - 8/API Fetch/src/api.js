// using Callback
const fetchUsersWithCallback = (callback) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => callback(users))
    .catch((error) =>
      console.error("Error fetching users with callback: ", error)
    );
};

// usig Promise
function fetchUsersWithPromise() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // console.log("response: ", response);
        // console.log("response.ok: ", response.ok);
        // console.log(response.status);
        let error = response.ok ? false : true;
        if (!error) {
          return response.json();
        } else {
          reject("promise rejected");
        }
      })
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}

// using  Async/await
const fetchUsersWithAsyncAwait = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // console.log("response: ", response);
    const users = await response.json();
    // console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users with async/await: ", error);
  }
};

const createUserCard = (user) => {
  return `
      <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
        <div class="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
        <h2 class="text-lg font-bold text-gray-800">${user.name}</h2>
        <p class="text-sm text-gray-500">${user.email}</p>
        <p class="text-sm text-gray-500">${user.company.name}</p>
      </div>
  `;
};

function displayUsers(users) {
  const userGrid = document.getElementById("user-grid");
  userGrid.innerHTML = users.map((user) => createUserCard(user)).join("");
  // console.log(
  //   "Users displayed: ",
  //   users.map((user) => createUserCard(user)).join("")
  // );
}

fetchUsersWithCallback(function (users) {
  console.log("with Callback:", users);
  displayUsers(users);
});

fetchUsersWithPromise()
  .then((users) => {
    console.log("Promise: success", users);
    displayUsers(users);
  })
  .catch((error) => console.error("Error on using Promise: ", error));

// const useAsyncAwait = async() => {
//   const users = await fetchUsersWithAsyncAwait();
//   console.log("with Async/Await:", users);
//   displayUsers(users);
// };
// useAsyncAwait();

(async function () {
  const users = await fetchUsersWithAsyncAwait();
  console.log("async/await:", users);
  displayUsers(users);
})();

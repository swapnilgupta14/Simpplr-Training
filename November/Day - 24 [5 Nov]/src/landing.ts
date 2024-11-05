interface Account {
  accountNumber: string;
  balance: number;
  transactions: Transaction[];
}

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  account: Account;
}

function saveUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function generateAccountNumber(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function generateUniqueUsername(
  firstName: string,
  lastName: string,
  users: User[]
): string {
  const baseUsername = `${firstName[0].toLowerCase()}${lastName[0].toLowerCase()}`;

  if (!users.find((user) => user.username === baseUsername)) {
    return baseUsername;
  }

  const existingUsernames = users
    .map((user) => user.username)
    .filter(
      (username) =>
        username === baseUsername ||
        (username.startsWith(baseUsername) &&
          /^\d+$/.test(username.slice(baseUsername.length)))
    );

  let highestNumber = 1;
  existingUsernames.forEach((username) => {
    if (username === baseUsername) return;
    const numberSuffix = parseInt(username.slice(baseUsername.length));
    if (!isNaN(numberSuffix) && numberSuffix >= highestNumber) {
      highestNumber = numberSuffix;
    }
  });

  return `${baseUsername}${highestNumber + 1}`;
}

function signup(firstName: string, lastName: string, password: string): void {
  const users: User[] = getUsers();
  const username: string = generateUniqueUsername(firstName, lastName, users);
  const accountNumber: string = generateAccountNumber();

  const newUser: User = {
    username,
    password,
    firstName,
    lastName,
    account: { accountNumber, balance: 0, transactions: [] },
  };

  users.push(newUser);
  saveUsers(users);

  alert(
    `User created! Your username is ${username} and account number is ${accountNumber}`
  );
  clearFormInputs();
  toggleForms();
}

function login(username: string, password: string): boolean {
  const users: User[] = getUsers();
  const user: User | undefined = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem(`${username}_loginTime`, new Date().toISOString());
    localStorage.setItem("currentUser", JSON.stringify(user));
    // console.log("hiiii");
    clearFormInputs();
    window.location.href = "./bankingSytem.html";
    return true;
  } else {
    alert("Invalid username or password.");
    return false;
  }
}

function handleLogin(): void {
  const usernameInput = document.getElementById(
    "loginUsername"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "loginPassword"
  ) as HTMLInputElement;
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }
  login(username, password);
}

function handleSignup(): void {
  const firstNameInput = document.getElementById(
    "signupFirstName"
  ) as HTMLInputElement;
  const lastNameInput = document.getElementById(
    "signupLastName"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "signupPassword"
  ) as HTMLInputElement;

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const password = passwordInput.value;

  if (!firstName || !lastName || !password) {
    alert("Please fill in all fields");
    return;
  }

  signup(firstName, lastName, password);

  firstNameInput.value = "";
  lastNameInput.value = "";
  passwordInput.value = "";
}

function toggleForms(): void {
  clearFormInputs();
  const loginPopup = document.getElementById("loginPopup") as HTMLElement;
  const signupPopup = document.getElementById("signupPopup") as HTMLElement;

  loginPopup.classList.toggle("hidden");
  signupPopup.classList.toggle("hidden");
}

function showLoginForm(): void {
  clearFormInputs();
  const loginPopup = document.getElementById("loginPopup") as HTMLElement;
  const signupPopup = document.getElementById("signupPopup") as HTMLElement;
  
  loginPopup.classList.remove("hidden");
  signupPopup.classList.add("hidden");
}

function showSignupForm(): void {
  clearFormInputs();
  const loginPopup = document.getElementById("loginPopup") as HTMLElement;
  const signupPopup = document.getElementById("signupPopup") as HTMLElement;
  
  loginPopup.classList.add("hidden");
  signupPopup.classList.remove("hidden");
}

function closePopups(): void {
  clearFormInputs();
  const loginPopup = document.getElementById("loginPopup") as HTMLElement;
  const signupPopup = document.getElementById("signupPopup") as HTMLElement;
  
  loginPopup.classList.add("hidden");
  signupPopup.classList.add("hidden");
}

function clearFormInputs(): void {
  const loginUsernameInput = document.getElementById("loginUsername") as HTMLInputElement;
  const loginPasswordInput = document.getElementById("loginPassword") as HTMLInputElement;
  const signupFirstNameInput = document.getElementById("signupFirstName") as HTMLInputElement;
  const signupLastNameInput = document.getElementById("signupLastName") as HTMLInputElement;
  const signupPasswordInput = document.getElementById("signupPassword") as HTMLInputElement;

  if (loginUsernameInput) loginUsernameInput.value = "";
  if (loginPasswordInput) loginPasswordInput.value = "";
  if (signupFirstNameInput) signupFirstNameInput.value = "";
  if (signupLastNameInput) signupLastNameInput.value = "";
  if (signupPasswordInput) signupPasswordInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");
  
  const handleLoginButton = document.getElementById("handleLogin");
  const handleSignupButton = document.getElementById("handleSignup");
  
  const toggleSignupButton = document.getElementById("toggleSignup");
  const toggleSigninButton = document.getElementById("toggleSignin");
  
  const closeLoginButton = document.getElementById("closeLogin");
  const closeSignupButton = document.getElementById("closeSignup");

  loginButton?.addEventListener("click", showLoginForm);
  signupButton?.addEventListener("click", showSignupForm);

  handleLoginButton?.addEventListener("click", handleLogin);
  handleSignupButton?.addEventListener("click", handleSignup);

  toggleSignupButton?.addEventListener("click", toggleForms);
  toggleSigninButton?.addEventListener("click", toggleForms);

  closeLoginButton?.addEventListener("click", closePopups);
  closeSignupButton?.addEventListener("click", closePopups);

  window.addEventListener("click", (event) => {
    const loginPopup = document.getElementById("loginPopup") as HTMLElement;
    const signupPopup = document.getElementById("signupPopup") as HTMLElement;
    
    if (event.target === loginPopup) {
      closePopups();
    }
    if (event.target === signupPopup) {
      closePopups();
    }
  });
});
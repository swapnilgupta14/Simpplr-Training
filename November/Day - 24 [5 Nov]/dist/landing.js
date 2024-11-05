"use strict";
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function generateAccountNumber() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}
function generateUniqueUsername(firstName, lastName, users) {
    const baseUsername = `${firstName[0].toLowerCase()}${lastName[0].toLowerCase()}`;
    if (!users.find((user) => user.username === baseUsername)) {
        return baseUsername;
    }
    const existingUsernames = users
        .map((user) => user.username)
        .filter((username) => username === baseUsername ||
        (username.startsWith(baseUsername) &&
            /^\d+$/.test(username.slice(baseUsername.length))));
    let highestNumber = 1;
    existingUsernames.forEach((username) => {
        if (username === baseUsername)
            return;
        const numberSuffix = parseInt(username.slice(baseUsername.length));
        if (!isNaN(numberSuffix) && numberSuffix >= highestNumber) {
            highestNumber = numberSuffix;
        }
    });
    return `${baseUsername}${highestNumber + 1}`;
}
function signup(firstName, lastName, password) {
    const users = getUsers();
    const username = generateUniqueUsername(firstName, lastName, users);
    const accountNumber = generateAccountNumber();
    const newUser = {
        username,
        password,
        firstName,
        lastName,
        account: { accountNumber, balance: 0, transactions: [] },
    };
    users.push(newUser);
    saveUsers(users);
    alert(`User created! Your username is ${username} and account number is ${accountNumber}`);
    clearFormInputs();
    toggleForms();
}
function login(username, password) {
    const users = getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem(`${username}_loginTime`, new Date().toISOString());
        localStorage.setItem("currentUser", JSON.stringify(user));
        // console.log("hiiii");
        clearFormInputs();
        window.location.href = "./bankingSytem.html";
        return true;
    }
    else {
        alert("Invalid username or password.");
        return false;
    }
}
function handleLogin() {
    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }
    login(username, password);
}
function handleSignup() {
    const firstNameInput = document.getElementById("signupFirstName");
    const lastNameInput = document.getElementById("signupLastName");
    const passwordInput = document.getElementById("signupPassword");
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
function toggleForms() {
    clearFormInputs();
    const loginPopup = document.getElementById("loginPopup");
    const signupPopup = document.getElementById("signupPopup");
    loginPopup.classList.toggle("hidden");
    signupPopup.classList.toggle("hidden");
}
function showLoginForm() {
    clearFormInputs();
    const loginPopup = document.getElementById("loginPopup");
    const signupPopup = document.getElementById("signupPopup");
    loginPopup.classList.remove("hidden");
    signupPopup.classList.add("hidden");
}
function showSignupForm() {
    clearFormInputs();
    const loginPopup = document.getElementById("loginPopup");
    const signupPopup = document.getElementById("signupPopup");
    loginPopup.classList.add("hidden");
    signupPopup.classList.remove("hidden");
}
function closePopups() {
    clearFormInputs();
    const loginPopup = document.getElementById("loginPopup");
    const signupPopup = document.getElementById("signupPopup");
    loginPopup.classList.add("hidden");
    signupPopup.classList.add("hidden");
}
function clearFormInputs() {
    const loginUsernameInput = document.getElementById("loginUsername");
    const loginPasswordInput = document.getElementById("loginPassword");
    const signupFirstNameInput = document.getElementById("signupFirstName");
    const signupLastNameInput = document.getElementById("signupLastName");
    const signupPasswordInput = document.getElementById("signupPassword");
    if (loginUsernameInput)
        loginUsernameInput.value = "";
    if (loginPasswordInput)
        loginPasswordInput.value = "";
    if (signupFirstNameInput)
        signupFirstNameInput.value = "";
    if (signupLastNameInput)
        signupLastNameInput.value = "";
    if (signupPasswordInput)
        signupPasswordInput.value = "";
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
    loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener("click", showLoginForm);
    signupButton === null || signupButton === void 0 ? void 0 : signupButton.addEventListener("click", showSignupForm);
    handleLoginButton === null || handleLoginButton === void 0 ? void 0 : handleLoginButton.addEventListener("click", handleLogin);
    handleSignupButton === null || handleSignupButton === void 0 ? void 0 : handleSignupButton.addEventListener("click", handleSignup);
    toggleSignupButton === null || toggleSignupButton === void 0 ? void 0 : toggleSignupButton.addEventListener("click", toggleForms);
    toggleSigninButton === null || toggleSigninButton === void 0 ? void 0 : toggleSigninButton.addEventListener("click", toggleForms);
    closeLoginButton === null || closeLoginButton === void 0 ? void 0 : closeLoginButton.addEventListener("click", closePopups);
    closeSignupButton === null || closeSignupButton === void 0 ? void 0 : closeSignupButton.addEventListener("click", closePopups);
    window.addEventListener("click", (event) => {
        const loginPopup = document.getElementById("loginPopup");
        const signupPopup = document.getElementById("signupPopup");
        if (event.target === loginPopup) {
            closePopups();
        }
        if (event.target === signupPopup) {
            closePopups();
        }
    });
});

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

interface Transaction {
  id: number;
  type: "Deposit" | "Withdrawal" | "Transfer" | "Loan";
  amount: number;
  timestamp: string;
  recipient?: {
    name: string;
    accountNumber: string;
  };
  sender?: {
    name: string;
    accountNumber: string;
  };
}

type SortField = "date" | "amount" | "type";

function mergeSort(arr: Transaction[], field: SortField): Transaction[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left, field), mergeSort(right, field), field);
}

function merge(
  left: Transaction[],
  right: Transaction[],
  field: SortField
): Transaction[] {
  const result: Transaction[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const comparison = compareTransactions(
      left[leftIndex],
      right[rightIndex],
      field
    );
    if (comparison <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function compareTransactions(
  a: Transaction,
  b: Transaction,
  field: SortField
): number {
  let comparison = 0;

  switch (field) {
    case "date":
      comparison =
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      break;
    case "amount":
      comparison = Math.abs(b.amount) - Math.abs(a.amount);
      break;
    case "type":
      comparison = b.type.localeCompare(a.type);
      break;
  }

  return comparison;
}

let currentUser: User | null = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);
let transactionId = 1;

function saveUsers1(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers1(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// function generateAccountNumber(): string {
//   return Math.random().toString(36).substring(2, 10).toUpperCase();
// }

function formatCurrency(amount: number): string {
  return `${amount.toFixed(2)}€`;
}

function updateUI(): void {
  if (!currentUser) return;

  const welcomeElement = document.getElementById(
    "welcomeElement"
  ) as HTMLParagraphElement;
  const accountNumberElement = document.getElementById(
    "accountNumber"
  ) as HTMLParagraphElement;
  const usernameElement = document.getElementById(
    "userName"
  ) as HTMLParagraphElement;

  welcomeElement.textContent = `Welcome! ${currentUser.firstName} ${currentUser.lastName}`;
  accountNumberElement.textContent = `Account No. ${currentUser.account.accountNumber}`;
  usernameElement.textContent = `Username: ${currentUser.username}`;

  const currentBalanceElement = document.getElementById(
    "currentBalance"
  ) as HTMLElement;
  const currentDateElement = document.getElementById(
    "currentDate"
  ) as HTMLElement;

  currentBalanceElement.textContent = formatCurrency(
    currentUser.account.balance
  );
  currentDateElement.textContent = new Date().toLocaleDateString();

  const transactionList = document.querySelector(
    ".transaction-list"
  ) as HTMLDivElement;
  transactionList.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 rounded-lg mb-6">
      <h4 class="text-xl font-semibold text-black">Transaction History</h4>
      <div class="flex gap-3">
        <select id="sortField" class="text-sm rounded-md px-3 py-2 bg-white text-gray-800 border-0 focus:ring-2 focus:ring-green-500">
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="type">Sort by Type</option>
        </select>
      </div>
    </div>
    <div id="transactionContainer" class="space-y-3"></div>
  `;

  const sortField = (document.getElementById("sortField") as HTMLSelectElement)
    .value as SortField;

  const sortedTransactions = mergeSort(
    currentUser.account.transactions,
    sortField
  );

  const transactionContainer = document.getElementById(
    "transactionContainer"
  ) as HTMLDivElement;
  transactionContainer.innerHTML = "";

  sortedTransactions.forEach((transaction) => {
    const transactionEl = document.createElement("div");
    transactionEl.className =
      "transaction-item flex justify-between items-center p-4 rounded-lg bg-white shadow-sm";

    let typeClass: string;
    switch (transaction.type) {
      case "Deposit":
        typeClass = "from-green-400 via-green-400 to-green-500";
        break;
      case "Transfer":
        typeClass = "from-red-400 via-red-400 to-red-500";
        break;
      case "Loan":
        typeClass = "from-yellow-400 via-yellow-400 to-yellow-500";
        break;
      default:
        typeClass = "from-gray-400 via-gray-400 to-gray-500";
    }

    let transactionDetails = "";
    if (transaction.recipient) {
      transactionDetails = `to: ${transaction.recipient.name} (Acct #${transaction.recipient.accountNumber})`;
    }
    if (transaction.sender) {
      transactionDetails = `from: ${transaction.sender.name} (Acct #${transaction.sender.accountNumber})`;
    }

    transactionEl.innerHTML = `
      <div class="transaction-info flex-1">
        <div class="flex items-center mb-1 justify-start gap-5">
          <span class="transaction-type text-xs font-medium bg-gradient-to-r ${typeClass} rounded-xl py-1 px-4 text-white">
            ${transaction.type}
          </span>
          <span class="text-xs text-gray-500">${transaction.timestamp}</span>
          <p class="text-sm text-gray-700">
            ${transactionDetails}
          </p>
        </div>
      </div>
      <span class="transaction-amount text-md font-medium">${formatCurrency(
        Math.abs(transaction.amount)
      )}</span>
    `;

    transactionContainer.appendChild(transactionEl);
  });

  const totalIn = currentUser.account.transactions
    .filter((t) => {
      return (t.type === "Deposit" || t.type === "Loan") && t.amount > 0;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = currentUser.account.transactions
    .filter((t) => {
      return t.type === "Transfer" && t.amount < 0;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalInterest = currentUser.account.transactions
    .filter((t) => t.type === "Loan")
    .reduce((sum, t) => sum + t.amount * 0.1, 0);

  const totalInElement = document.getElementById("totalIn") as HTMLElement;
  const totalOutElement = document.getElementById("totalOut") as HTMLElement;
  const totalInterestElement = document.getElementById(
    "totalInterest"
  ) as HTMLElement;

  totalInElement.textContent = formatCurrency(totalIn);
  totalOutElement.textContent = formatCurrency(totalOut);
  totalInterestElement.textContent = formatCurrency(totalInterest);

  const sortFieldSelect = document.getElementById(
    "sortField"
  ) as HTMLSelectElement;
  if (sortFieldSelect) {
    sortFieldSelect.addEventListener("change", () => {
      const selectedField = sortFieldSelect.value as SortField;
      const sortedTransactions = mergeSort(
        currentUser!.account.transactions,
        selectedField
      );
      displayTransactions(sortedTransactions);
    });
  }
}

function displayTransactions(transactions: Transaction[]): void {
  if (!currentUser) return;

  const transactionContainer = document.getElementById(
    "transactionContainer"
  ) as HTMLDivElement;
  transactionContainer.innerHTML = "";

  transactions.forEach((transaction) => {
    const transactionEl = document.createElement("div");
    transactionEl.className =
      "transaction-item flex justify-between items-center p-4 rounded-lg bg-white shadow-sm";

    let typeClass: string;
    switch (transaction.type) {
      case "Deposit":
        typeClass = "from-green-400 via-green-400 to-green-500";
        break;
      case "Transfer":
        typeClass = "from-red-400 via-red-400 to-red-500";
        break;
      case "Loan":
        typeClass = "from-yellow-400 via-yellow-400 to-yellow-500";
        break;
      default:
        typeClass = "from-gray-400 via-gray-400 to-gray-500";
    }

    let transactionDetails = "";
    if (transaction.recipient) {
      transactionDetails = `to: ${transaction.recipient.name} (Acct #${transaction.recipient.accountNumber})`;
    }
    if (transaction.sender) {
      transactionDetails = `from: ${transaction.sender.name} (Acct #${transaction.sender.accountNumber})`;
    }

    transactionEl.innerHTML = `
      <div class="transaction-info flex-1">
        <div class="flex items-center mb-1 justify-start gap-5">
          <span class="transaction-type text-xs font-medium bg-gradient-to-r ${typeClass} rounded-xl py-1 px-4 text-white">
            ${transaction.type}
          </span>
          <span class="text-xs text-gray-500">${transaction.timestamp}</span>
          <p class="text-sm text-gray-700">
            ${transactionDetails}
          </p>
        </div>
      </div>
      <span class="transaction-amount text-md font-medium">${formatCurrency(
        Math.abs(transaction.amount)
      )}</span>
    `;

    transactionContainer.appendChild(transactionEl);
  });
}

// function generateUniqueUsername(
//   firstName: string,
//   lastName: string,
//   users: User[]
// ): string {
//   const baseUsername: string = `${firstName[0].toLowerCase()}${lastName[0].toLowerCase()}`;

//   if (!users.find((user) => user.username === baseUsername)) {
//     return baseUsername;
//   }

//   const existingUsernames = users
//     .map((user) => user.username)
//     .filter(
//       (username) =>
//         username === baseUsername ||
//         (username.startsWith(baseUsername) &&
//           /^\d+$/.test(username.slice(baseUsername.length)))
//     );

//   let highestNumber: number = 1;
//   existingUsernames.forEach((username) => {
//     if (username === baseUsername) return;
//     const numberSuffix = parseInt(username.slice(baseUsername.length));
//     if (!isNaN(numberSuffix) && numberSuffix >= highestNumber) {
//       highestNumber = numberSuffix;
//     }
//   });

//   return `${baseUsername}${highestNumber + 1}`;
// }

// function signup(firstName: string, lastName: string, password: string): void {
//   const users: User[] = getUsers();
//   const username: string = generateUniqueUsername(firstName, lastName, users);
//   const accountNumber: string = generateAccountNumber();

//   const newUser: User = {
//     username,
//     password,
//     firstName,
//     lastName,
//     account: { accountNumber, balance: 0, transactions: [] },
//   };

//   users.push(newUser);
//   saveUsers1(users);

//   alert(
//     `User created! Your username is ${username} and account number is ${accountNumber}`
//   );
// }

// function login(username: string, password: string): boolean {
//   const users: User[] = getUsers();
//   const user: User | undefined = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     currentUser = user;
//     const bankAppElement = document.getElementById("bankApp") as HTMLElement;
//     const authFormsElement = document.getElementById(
//       "authForms"
//     ) as HTMLElement;
//     bankAppElement.classList.remove("hidden");
//     authFormsElement.classList.add("hidden");
//     updateUI();
//     return true;
//   } else {
//     alert("Invalid username or password.");
//     return false;
//   }
// }

// function handleLogin(): void {
//   const usernameInput = document.getElementById(
//     "loginUsername"
//   ) as HTMLInputElement;
//   const passwordInput = document.getElementById(
//     "loginPassword"
//   ) as HTMLInputElement;
//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   if (!username || !password) {
//     alert("Please fill in all fields");
//     return;
//   }
//   console.log("Going to login....");
//   login(username, password);
// }

// function handleSignup(): void {
//   const firstNameInput = document.getElementById(
//     "signupFirstName"
//   ) as HTMLInputElement;
//   const lastNameInput = document.getElementById(
//     "signupLastName"
//   ) as HTMLInputElement;
//   const passwordInput = document.getElementById(
//     "signupPassword"
//   ) as HTMLInputElement;

//   const firstName = firstNameInput.value;
//   const lastName = lastNameInput.value;
//   const password = passwordInput.value;

//   if (!firstName || !lastName || !password) {
//     alert("Please fill in all fields");
//     return;
//   }

//   console.log("Going to logout....");
//   signup(firstName, lastName, password);

//   firstNameInput.value = "";
//   lastNameInput.value = "";
//   passwordInput.value = "";
//   toggleForms();
// }

const haveAccountSignInButton = document.getElementById("signInButton");
const dontHaveAccountSignUpButton = document.getElementById("signUpButton");

// function toggleForms(): void {
//   console.log("toggleForms");

//   const loginForm = document.getElementById("loginPopup") as HTMLElement;
//   const signupForm = document.getElementById("signupPopup") as HTMLElement;

//   loginForm.classList.toggle("hidden");
//   signupForm.classList.toggle("hidden");
// }

function transferMoney(): void {
  const transferToInput = document.getElementById(
    "transferTo"
  ) as HTMLInputElement;
  const transferAmountInput = document.getElementById(
    "transferAmount"
  ) as HTMLInputElement;
  const transferTo = transferToInput.value;
  const amount = +transferAmountInput.value;

  if (!currentUser || amount <= 0 || amount > currentUser.account.balance) {
    alert("Invalid transfer amount or insufficient balance.");
    return;
  }

  if (transferTo === currentUser.username) {
    alert("You cannot transfer money to yourself.");
    return;
  }

  const users: User[] = getUsers1();
  const recipient: User | undefined = users.find(
    (user) => user.username === transferTo
  );

  if (!recipient) {
    alert("Recipient does not exist.");
    return;
  }

  currentUser.account.balance -= amount;
  recipient.account.balance += amount;

  const senderTransaction: Transaction = {
    id: transactionId++,
    type: "Transfer",
    amount: -amount,
    timestamp: new Date().toLocaleString(),
    recipient: {
      name: `${recipient.firstName} ${recipient.lastName}`,
      accountNumber: recipient.account.accountNumber,
    },
  };

  const recipientTransaction: Transaction = {
    id: transactionId++,
    type: "Deposit",
    amount: amount,
    timestamp: new Date().toLocaleString(),
    sender: {
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      accountNumber: currentUser.account.accountNumber,
    },
  };

  currentUser.account.transactions.push(senderTransaction);
  recipient.account.transactions.push(recipientTransaction);

  const updatedUsers = users.map((user) => {
    if (user.username === currentUser?.username) return currentUser;
    if (user.username === recipient.username) return recipient;
    return user;
  });

  localStorage.setItem(
    `${currentUser?.username}_loginTime`,
    new Date().toISOString()
  );
  saveUsers1(updatedUsers);
  updateUI();

  transferToInput.value = "";
  transferAmountInput.value = "";
}

function requestLoan(): void {
  const loanAmountInput = document.getElementById(
    "loanAmount"
  ) as HTMLInputElement;
  const loanAmount = +loanAmountInput.value;

  if (!currentUser || loanAmount <= 0) {
    alert("Invalid loan amount.");
    return;
  }

  const interestRate = 0.1;
  const totalLoanAmount = loanAmount + loanAmount * interestRate;

  currentUser.account.balance += loanAmount;

  const loanTransaction: Transaction = {
    id: transactionId++,
    type: "Loan",
    amount: loanAmount,
    timestamp: new Date().toLocaleString(),
  };

  currentUser.account.transactions.push(loanTransaction);

  const users = getUsers1().map((user) =>
    user.username === currentUser?.username ? currentUser : user
  );

  localStorage.setItem(
    `${currentUser?.username}_loginTime`,
    new Date().toISOString()
  );
  saveUsers1(users);
  updateUI();

  loanAmountInput.value = "";
  alert(
    `Loan approved! Amount credited: ${formatCurrency(
      loanAmount
    )}. Total repayment with interest: ${formatCurrency(totalLoanAmount)}.`
  );
}

function creditMoney(): void {
  // console.log("1");
  const creditAmountInput = document.getElementById(
    "creditAmount"
  ) as HTMLInputElement;
  const amount: number = +creditAmountInput.value;

  if (!currentUser || amount <= 0) {
    alert("Invalid amount.");
    return;
  }

  // console.log("2");

  currentUser.account.balance += amount;
  const transaction: Transaction = {
    id: transactionId++,
    type: "Deposit",
    amount,
    timestamp: new Date().toLocaleString(),
    recipient: {
      name: "Self",
      accountNumber: currentUser.account.accountNumber,
    },
  };
  currentUser.account.transactions.push(transaction);
  // console.log("3");

  const users = getUsers1().map((user) =>
    user.username === currentUser?.username ? currentUser : user
  );

  // console.log("4");

  localStorage.setItem(
    `${currentUser?.username}_loginTime`,
    new Date().toISOString()
  );
  saveUsers1(users);
  updateUI();

  creditAmountInput.value = "";
}

function closeAccount(): void {
  const closeUsernameInput = document.getElementById(
    "closeUsername"
  ) as HTMLInputElement;
  const closePasswordInput = document.getElementById(
    "closePassword"
  ) as HTMLInputElement;
  const username = closeUsernameInput.value;
  const password = closePasswordInput.value;

  if (
    !currentUser ||
    currentUser.username !== username ||
    currentUser.password !== password
  ) {
    alert("Invalid account details.");
    return;
  }

  if (
    confirm(
      "Are you sure you want to close your account? This action cannot be undone."
    )
  ) {
    const users = getUsers1().filter(
      (user) => user.username !== currentUser?.username
    );
    saveUsers1(users);
    currentUser = null;
    const bankAppElement = document.getElementById("bankApp") as HTMLElement;
    const authFormsElement = document.getElementById(
      "authForms"
    ) as HTMLElement;
    bankAppElement.classList.add("hidden");
    authFormsElement.classList.remove("hidden");
    alert("Account closed successfully.");
  }
}

function logout(): void {
  localStorage.removeItem("currentUser");
  localStorage.removeItem(`${currentUser?.username}_loginTime`);
  window.location.href = "./index.html";
}

function startLogoutTimer(): void {
  const loginTimeKey = `${currentUser?.username}_loginTime`;
  const totalTimeInSeconds = 5 * 60;

  function updateTimerText() {
    const loginTime = localStorage.getItem(loginTimeKey);
    if (!loginTime) {
      console.error("Login time not found in local storage.");
      return;
    }
    let loginDate = new Date(loginTime);
    loginDate.setMinutes(loginDate.getMinutes() + 5);
    const now = new Date();
    const remainingTimeInSeconds = Math.floor(
      (loginDate.getTime() - now.getTime()) / 1000
    );
    const minutes = Math.max(0, Math.floor(remainingTimeInSeconds / 60));
    const seconds = Math.max(0, remainingTimeInSeconds % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    const timerTextElement = document.getElementById("timer-text");
    if (timerTextElement) {
      timerTextElement.innerHTML = `You will be logged out in <span class="text-red-700 font-semibold">${formattedTime}</span> mins automatically.`;
    }
    if (remainingTimeInSeconds <= 0) {
      clearInterval(timerInterval);
      if (timerTextElement) {
        timerTextElement.innerText = "You have been logged out.";
      }
      logout();
    }
  }

  const timerInterval = setInterval(updateTimerText, 1000);
  console.log(timerInterval, "timerInterval");
  updateTimerText();
}

document.addEventListener("DOMContentLoaded", () => {
  const transferButton = document.getElementById(
    "transferMoney"
  ) as HTMLButtonElement;
  const loanButton = document.getElementById(
    "requestLoan"
  ) as HTMLButtonElement;
  const creditButton = document.getElementById(
    "creditMoney"
  ) as HTMLButtonElement;
  const closeAccountButton = document.getElementById(
    "closeAccount"
  ) as HTMLButtonElement;
  const logoutButton = document.getElementById("logOut") as HTMLButtonElement;
  transferButton.addEventListener("click", transferMoney);
  loanButton.addEventListener("click", requestLoan);
  creditButton.addEventListener("click", creditMoney);
  closeAccountButton.addEventListener("click", closeAccount);
  logoutButton.addEventListener("click", logout);

  const setupSortListeners = () => {
    const sortFieldSelect = document.getElementById(
      "sortField"
    ) as HTMLSelectElement;
    const sortDirectionSelect = document.getElementById(
      "sortDirection"
    ) as HTMLSelectElement;

    if (sortFieldSelect && sortDirectionSelect) {
      sortFieldSelect.addEventListener("change", updateUI);
      sortDirectionSelect.addEventListener("change", updateUI);
    }
  };

  setupSortListeners();

  if (currentUser) {
    updateUI();
    startLogoutTimer();
  } else {
    window.location.href = "./index.html";
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        setupSortListeners();
      }
    });
  });

  const transactionList = document.querySelector(".transaction-list");
  if (transactionList) {
    observer.observe(transactionList, { childList: true, subtree: true });
  }
});

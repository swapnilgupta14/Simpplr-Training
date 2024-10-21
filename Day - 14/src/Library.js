//1
const Library = {
  availableBooks: [],
  addBookToLibrary(book) {
    this.availableBooks.push(book);
  },
  listAvailableBooks() {
    return this.availableBooks.filter((book) => !book.isCurrentlyBorrowed);
  },
};

// 2 - Book Factory
function createNewBook(title, author) {
  return { title, author, isCurrentlyBorrowed: false };
}

//3-  User Constructor
function User(userName, membershipId = null) {
  this.userName = userName;
  this.membershipId = membershipId;
  this.borrowedBooks = [];
}

User.prototype.borrowBook = function (book) {
  if (!book.isCurrentlyBorrowed) {
    book.isCurrentlyBorrowed = true;
    this.borrowedBooks.push(book);
    alert(`${this.userName} borrowed "${book.title}"`);
  } else {
    alert(`"${book.title}" is already borrowed.`);
  }
};

User.prototype.returnBook = function (book) {
  const index = this.borrowedBooks.indexOf(book);
  if (index !== -1) {
    book.isCurrentlyBorrowed = false;
    this.borrowedBooks.splice(index, 1);
    alert(`${this.userName} returned "${book.title}"`);
  } else {
    alert(`You haven't borrowed "${book.title}".`);
  }
};


// // 4 Inheritance Prototypal
// function LibraryMember(memberName, membershipId) {
//   User.call(this, memberName);
//   this.membershipId = membershipId;
//   //   console.log(this);
// }


// // 5 -- demonstrate prototype chaining
// LibraryMember.prototype = Object.create(User.prototype);
// LibraryMember.prototype.constructor = LibraryMember;
// LibraryMember.prototype.getMembershipInfo = function () {
//   console.log(
//     `Member Name: ${this.userName}, Membership ID: ${this.membershipId}`
//   );
// };


const users = [];
const bookOne = createNewBook("Book1", "Author1");
const bookTwo = createNewBook("Book2", "Author2");
const bookThree = createNewBook("Book3", "Author3");
Library.addBookToLibrary(bookOne);
Library.addBookToLibrary(bookTwo);
Library.addBookToLibrary(bookThree);

document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("user-select");
  const returnUserSelect = document.getElementById("return-user-select");
  const bookSelect = document.getElementById("book-select");
  const returnBookSelect = document.getElementById("return-book-select");
  const availableBooksList = document.getElementById("available-books");
  const borrowedBooksSection = document.getElementById(
    "borrowed-books-section"
  );


  const renderAvailableBooks = () => {
    availableBooksList.innerHTML = "";
   
    bookSelect.innerHTML = '<option value="">Select a book</option>';

    Library.listAvailableBooks().forEach((book) => {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author}`;
      availableBooksList.appendChild(li);

      const option = new Option(book.title, book.title);
      bookSelect.add(option);
    });
  };

  const renderBorrowedBooks = () => {
    borrowedBooksSection.innerHTML = "";

    users.forEach((user) => {
      if (user.borrowedBooks.length > 0) {
        const userCard = document.createElement("div");
        userCard.className = "bg-white shadow-md rounded-lg p-4";

        const userTitle = document.createElement("h3");
        userTitle.className = "text-lg font-medium mb-2";
        userTitle.textContent = `${user.userName} (ID: ${
          user.membershipId || "N/A"
        })`;

        const bookList = document.createElement("ul");
        user.borrowedBooks.forEach((book) => {
          const li = document.createElement("li");
          li.textContent = `${book.title} by ${book.author}`;
          bookList.appendChild(li);
        });

        userCard.appendChild(userTitle);
        userCard.appendChild(bookList);
        borrowedBooksSection.appendChild(userCard);
      }
    });
  };

  const updateReturnBookDropdown = (selectedUser) => {
    returnBookSelect.innerHTML = '<option value="">Select a book</option>';

    if (selectedUser && selectedUser.borrowedBooks.length > 0) {
      selectedUser.borrowedBooks.forEach((book) => {
        const option = new Option(book.title, book.title);
        returnBookSelect.add(option);
      });
    }
  };

  document.getElementById("create-user").addEventListener("click", () => {
    const userName = document.getElementById("user-name").value.trim();
    const membershipId = document.getElementById("membership-id").value.trim();

    //  if (users.length < 1) {
    //   document.getElementById("input-return").innerText = "Create a user";
    // }else{
    //   document.getElementById("input-return").innerText = "Select User";
    // }

    if (userName) {
      const user = new User(userName, membershipId);
      users.push(user);

      const userOption = new Option(userName, userName);
      userSelect.add(userOption);
      returnUserSelect.add(userOption.cloneNode(true));

      alert(`User "${userName}" created successfully.`);
    }
  });

  document.getElementById("borrow-book").addEventListener("click", () => {
    const user = users.find((u) => u.userName === userSelect.value);
    const book = Library.availableBooks.find(
      (b) => b.title === bookSelect.value
    );

    if (user && book) {
      user.borrowBook(book);
      renderAvailableBooks();
      renderBorrowedBooks();
    }
  });

  document.getElementById("return-book").addEventListener("click", () => {
    const user = users.find((u) => u.userName === returnUserSelect.value);
    const book = user.borrowedBooks.find(
      (b) => b.title === returnBookSelect.value
    );

    if (user && book) {
      user.returnBook(book);
      renderAvailableBooks();
      renderBorrowedBooks();
      updateReturnBookDropdown(user);
    }
  });

  returnUserSelect.addEventListener("change", (e) => {
    const selectedUser = users.find((u) => u.userName === e.target.value);
    updateReturnBookDropdown(selectedUser);
  });

  renderAvailableBooks();
});

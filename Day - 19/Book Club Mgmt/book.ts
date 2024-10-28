enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  HORROR = "HORROR",
  SCI_FI = "SCI_FI",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

enum Role {
  ORGANIZER = "ORGANIZER",
  MODERATOR = "MODERATOR",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

interface Book {
  title: string;
  author: string;
  genre: Genre;
}

interface Member {
  name: string;
  role: Role;
}

function getBooksByGenre(books: Book[], genre: Genre): Book[] {
  return books.filter((book) => book.genre === genre);
}

function getMembersByRole(members: Member[], role: Role): Member[] {
  return members.filter((member) => member.role === role);
}

type GenreCount = {
  [key in Genre]: number;
};

const countBooksByGenre = (books: Book[]): GenreCount => {
  const initialCount: GenreCount = {
    [Genre.FICTION]: 0,
    [Genre.NON_FICTION]: 0,
    [Genre.HORROR]: 0,
    [Genre.SCI_FI]: 0,
    [Genre.BIOGRAPHY]: 0,
    [Genre.FANTASY]: 0,
  };

  let result: GenreCount = books.reduce((acc, book) => {
    acc[book.genre]++;
    return acc;
  }, initialCount);
  return result;
};

const books: Book[] = [
  {
    title: "Book1",
    author: "Author1",
    genre: Genre.FICTION,
  },
  { title: "Book2", author: "Author2", genre: Genre.NON_FICTION },
  { title: "Book3", author: "Author3", genre: Genre.SCI_FI },
  { title: "Book4", author: "Author4", genre: Genre.FANTASY },
  { title: "Book5", author: "Author5", genre: Genre.FICTION },
];

const members: Member[] = [
  { name: "Organiser1", role: Role.ORGANIZER },
  { name: "Moderator1", role: Role.MODERATOR },
  { name: "Member1", role: Role.MEMBER },
  { name: "Member2", role: Role.MEMBER },
  { name: "Guest1", role: Role.GUEST },
];

console.log("\n");
console.log("Fiction Books:", getBooksByGenre(books, Genre.FICTION));
console.log("HORROR Books:", getBooksByGenre(books, Genre.HORROR));
console.log("\n");
console.log("Regular Members:", getMembersByRole(members, Role.MEMBER));
console.log("Guests", getMembersByRole(members, Role.GUEST));
console.log("\n");
console.log("Books by Genre Count:", countBooksByGenre(books));

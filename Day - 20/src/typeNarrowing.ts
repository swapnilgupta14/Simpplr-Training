function demoFunction(item: string | string[]) {
  if (typeof item === "string") {
    console.log(item.length);
  } else {
    console.log(item.length);
  }
}

const str: string[] = ["A", "B", "C"];
demoFunction(str);
demoFunction("ABCDEFGH");

// discriminated Unions
type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; side: number };

function getArea(shape: Shape) {
  if (shape.type === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.side ** 2;
  }
}

const s1: Shape = { type: "circle", radius: 10 };
const s2: Shape = { type: "square", side: 5 };

console.log("circle area:", getArea(s1));
console.log("Square area:", getArea(s2));

function processInput(input: string | number | boolean | number[]) {
  if (input) {
    if (typeof input === "string") {
      return `String length: ${input.length}`;
    } else if (typeof input === "number") {
      return `Rounded number: ${Math.round(input)}`;
    } else if (typeof input === "boolean") {
      return input ? "Boolean is true" : "Boolean is false";
    } else if (Array.isArray(input)) {
      const sum = input.reduce((acc, num) => acc + num, 0);
      return `Sum of array: ${sum}`;
    }
  }
}

console.log(processInput("Hello TypeScript"));
console.log(processInput(42.89));
console.log(processInput(true));
console.log(processInput([1, 2, 3, 4]));

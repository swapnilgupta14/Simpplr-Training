export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}


export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}


export function calculateAverage(arrayNum) {
  if (!Array.isArray(arrayNum) || arrayNum.length === 0) {
    throw new Error("Input must be a non-empty array");
  }
  if (!arrayNum.every((item) => typeof item === "number")) {
    throw new Error("Array must contain only numbers");
  }
  const sum = arrayNum.reduce((acc, item) => acc + item, 0);
  return sum / arrayNum.length;
}


export function factorial(n) {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

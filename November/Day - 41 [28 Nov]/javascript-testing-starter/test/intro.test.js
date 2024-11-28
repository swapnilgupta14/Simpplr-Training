import { describe, test, it, expect } from "vitest";
import { fizzBuzz, max, calculateAverage, factorial } from "../src/intro";

describe("max", () => {
  it("Should return the 1st arg if its greater", () => {
    //Arrange
    const a = 10;
    const b = 2;
    // Act
    const res = max(a, b);
    // Assert
    expect(res).toBe(10);
  });

  it("Should return the 2nd arg if its greater", () => {
    const res = max(10, 20);
    expect(res).toBe(20);
  });

  it("Should return the 1st arg if its equal to 2nd arg", () => {
    const res = max(10, 10);
    expect(res).toBe(10);
  });
});


describe("fizzBuzz", () => {
  it("Should return FizzBuzz if number is div by both 3 && 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz(-15)).toBe("FizzBuzz");
  });

  it("Should return Fizz if number is div by only 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  it("Should return Buzz if number is div by only 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("Should return FizzBuzz if number 0", () => {
    expect(fizzBuzz(0)).toBe("FizzBuzz");
  });

  it("Should return string(number) if number is not div by anyone - 3 or 5", () => {
    expect(fizzBuzz(7)).toBe("7");
  });
});


describe("calculateAverage", () => {
  it("Should return the item itself if there is only one item", () => {
    expect(calculateAverage([2])).toBe(2);
  });

  it("Should return the average of the numbers given in the array", () => {
    expect(calculateAverage([2, 2, 4, 4])).toBe(3);
  });

  it("Should throw an error if the array is empty", () => {
    expect(() => calculateAverage([])).toThrow(
      "Input must be a non-empty array"
    );
  });

  it("Should throw an error if the input is not an array", () => {
    expect(() => calculateAverage(5)).toThrow(
      "Input must be a non-empty array"
    );
  });

  it("Should throw an error if the array contains non-numeric val", () => {
    expect(() => calculateAverage([2, "3", 4])).toThrow(
      "Array must contain only numbers"
    );
  });
});



describe("factorial", () => {
  it("Should return 1 for 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("Should return 1 for 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("Should return the correct factorial for positive numbers", () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(3)).toBe(6);
  });

  it("Should throw an error for negative numbers", () => {
    expect(() => factorial(-5)).toThrow(
      "Factorial is not defined for negative numbers"
    );
  });

  it("Should return the correct factorial for large numbers", () => {
    expect(factorial(8)).toBe(40320);
  });
});

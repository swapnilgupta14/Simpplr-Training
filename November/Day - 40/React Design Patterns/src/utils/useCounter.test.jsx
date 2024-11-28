import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./useCounter";
import assert from "assert";

describe("useCounter", () => {
  it("should initialize count with the default val", () => {
    const { result } = renderHook(() => useCounter());
    assert.strictEqual(result.current.count, 0);
  });

  it("should initialize count with a custom val", () => {
    const { result } = renderHook(() => useCounter(5));
    assert.strictEqual(result.current.count, 5);
  });

  it("should increment the count", () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => {
      result.current.increment();
    });
    assert.strictEqual(result.current.count, 1);
  });

  it("should decrement the count", () => {
    const { result } = renderHook(() => useCounter(1));
    act(() => {
      result.current.decrement();
    });
    assert.strictEqual(result.current.count, 0);
  });

  it("should reset the count", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    assert.strictEqual(result.current.count, 10);
  });
});

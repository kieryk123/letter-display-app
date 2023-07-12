import { renderHook, act } from "@testing-library/react";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useFetchLetters } from "../useFetchLetters";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

global.fetch = jest.fn();

describe("useFetchLetters", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("should fetch letters and update state", async () => {
    const data = {
      data: {
        letter: "A",
      },
    };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(data),
      status: 200,
    });

    const { result, waitForNextUpdate } = renderHook(
      () => useFetchLetters({ id: 1, intervalMs: 2000 }),
      { wrapper }
    );

    expect(result.current.letters).toBe("");

    await waitForNextUpdate();

    expect(result.current.letters).toBe("A");

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(data),
      status: 200,
    });

    await waitForNextUpdate();

    expect(result.current.letters).toBe("AA");
  });

  test("should handle error from fetch", async () => {
    global.fetch.mockRejectedValueOnce(
      new Error("Server responded with status 418")
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useFetchLetters({ id: 1, intervalMs: 2000 }),
      { wrapper }
    );

    expect(result.current.letters).toBe("");

    await waitForNextUpdate();

    expect(result.error).toEqual(new Error("Server responded with status 418"));
    expect(result.current.letters).toBe("");
  });
});

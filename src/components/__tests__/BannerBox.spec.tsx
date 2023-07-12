import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BannerBox } from "../BannerBox";

const queryClient = new QueryClient();

jest.mock("../../hooks/useFetchLetters", () => ({
  useFetchLetters: jest.fn(() => ({ letters: "Test letters" })),
}));

describe("BannerBox", () => {
  const bannerId = 1;

  it("renders correctly", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <BannerBox id={bannerId} />
      </QueryClientProvider>
    );

    const title = getByText(`Banner ${bannerId}`);
    const letters = getByText("Test letters");

    expect(title).toBeInTheDocument();
    expect(letters).toBeInTheDocument();
  });

  it("renders with custom intervalMs prop", () => {
    const intervalMs = 3000;
    render(
      <QueryClientProvider client={queryClient}>
        <BannerBox id={bannerId} intervalMs={intervalMs} />
      </QueryClientProvider>
    );

    expect(useFetchLetters).toHaveBeenCalledWith({ id: bannerId, intervalMs });
  });
});

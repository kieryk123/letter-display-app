import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  const mockOnToggle = jest.fn();
  const checkboxId = 1;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <Checkbox id={checkboxId} checked={false} onToggle={mockOnToggle} />
    );

    const label = getByText(`Banner ${checkboxId}:`);
    const checkbox = getByTestId("checkbox-input");

    expect(label).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });

  it("calls onToggle function when checkbox is clicked", () => {
    const { getByTestId } = render(
      <Checkbox id={checkboxId} checked={false} onToggle={mockOnToggle} />
    );

    const checkbox = getByTestId("checkbox-input");
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(checkboxId);
  });
});

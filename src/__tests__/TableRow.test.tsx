import {
  RenderResult,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { beforeEach, describe, test, expect, vi } from "vitest";
import { mockedProductIdOne } from "src/test/mocks/handlers";
import TableRow from "src/components/TableRow";
import wrapper from "src/utils/test-utils";

describe("TableRow", () => {
  let query: RenderResult["queryByRole"];
  let mockChangeProductInfoId: () => void;

  beforeEach(() => {
    mockChangeProductInfoId = vi.fn();

    const { queryByText } = render(
      <TableRow
        handleClick={mockChangeProductInfoId}
        {...mockedProductIdOne.data}
      />,
      {
        wrapper,
      }
    );
    query = queryByText;
  });

  test("Positive render test", () => {
    expect(screen.getByText(mockedProductIdOne.data.id)).toBeInTheDocument();
    expect(screen.getByText(mockedProductIdOne.data.name)).toBeInTheDocument();
    expect(screen.getByText(mockedProductIdOne.data.year)).toBeInTheDocument();
    expect(
      query(mockedProductIdOne.data.pantone_value)
    ).not.toBeInTheDocument();
    expect(query(mockedProductIdOne.data.color)).not.toBeInTheDocument();
  });

  test("Row click test", () => {
    const row = screen.getByRole("row");

    expect(row).toBeInTheDocument();
    fireEvent.click(row);
    expect(mockChangeProductInfoId).toHaveBeenCalledTimes(1);
  });
});

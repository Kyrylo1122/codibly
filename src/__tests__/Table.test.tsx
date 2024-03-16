import BasicTable from "src/components/Table";
import { beforeEach, describe, expect, test } from "vitest";
import wrapper, { checkRowContents } from "src/utils/test-utils";
import { render, screen, within } from "@testing-library/react";
import {
  mockedFirstPageProducts,
  mockedProductIdOne,
} from "src/test/mocks/handlers";

describe("BasicTable one product", () => {
  const props = {
    rows: mockedProductIdOne.data,
    rowsPerPage: 5,
    page: 1,
    total: 1,
  };
  beforeEach(() => {
    render(<BasicTable {...props} />, { wrapper });
  });

  test("Check correct table render", () => {
    const table = screen.getByRole("table");
    const tableRows = within(table).getAllByRole("row");
    expect(table).toBeInTheDocument();
    checkRowContents({
      row: tableRows[0],
      id: "Id",
      name: "Name",
      year: "Year",
      role: "columnheader",
    });
  });
  test("Correct one product render", () => {
    const table = screen.getByRole("table");
    const tableRows = within(table).getAllByRole("row");
    expect(table).toBeInTheDocument();
    const { id, name, year } = mockedProductIdOne.data;

    checkRowContents({ row: tableRows[1], id, name, year, role: "cell" });
  });
});

describe("BasicTable first page rende", () => {
  const props = {
    rows: mockedFirstPageProducts.data,
    rowsPerPage: 5,
    page: 1,
    total: 12,
  };
  beforeEach(() => {
    render(<BasicTable {...props} />, { wrapper });
  });
  test("Positive render test", () => {
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    const cellFirstNameRowContent = screen.getByText(
      mockedFirstPageProducts.data[0].name
    );
    const cellFifthNameRowContent = screen.getByText(
      mockedFirstPageProducts.data[4].name
    );

    expect(cellFifthNameRowContent).toBeInTheDocument();
    expect(cellFirstNameRowContent).toBeInTheDocument();
    expect(mockedFirstPageProducts?.data[5]?.name).toBe(undefined);
  });
  test("Test render pagination buttons", () => {
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});

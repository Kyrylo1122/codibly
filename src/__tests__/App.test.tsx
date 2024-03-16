import {
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "src/App";
import { beforeEach, describe, expect, test } from "vitest";
import wrapper from "src/utils/test-utils";
import { useGetProductsQuery } from "src/libs/rtk-query";
import { mockedFirstPageProducts } from "src/test/mocks/handlers";

describe("App", () => {
  beforeEach(() => {
    render(<App />, {
      wrapper,
    });
  });

  test("App positive render test", async () => {
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      const table = screen.getByRole("table");

      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
      expect(table).toBeInTheDocument();
      expect(within(table).getAllByRole("columnheader")).toHaveLength(3);
    });
  });
  test("App render hook", async () => {
    const params = { page: 1, per_page: 5 };
    const { result } = renderHook(() => useGetProductsQuery(params), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toMatchObject(mockedFirstPageProducts);
    });
  });
});

import { describe, expect, test } from "vitest";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

import ProductInfo from "src/components/ProductInfo";
import { useGetProductByIdQuery } from "src/libs/rtk-query";

import { mockedProductIdOne } from "src/test/mocks/handlers";
import wrapper from "src/utils/test-utils";
describe("ProductInfo", () => {
  test("renders hook", async () => {
    const { result } = renderHook(() => useGetProductByIdQuery("1"), {
      wrapper,
    });
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getProductById",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toMatchObject(mockedProductIdOne);
  });
  test("render component ProductInfo", async () => {
    const id = "1";
    render(<ProductInfo id={id} />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText("Product Info")).toBeInTheDocument();
      expect(
        screen.getByText(`Id:${mockedProductIdOne.data.id}`)
      ).toBeInTheDocument();

      expect(
        screen.getByText(`Color:${mockedProductIdOne.data.color}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Name:${mockedProductIdOne.data.name}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Year:${mockedProductIdOne.data.year}`)
      ).toBeInTheDocument();
    });
  });
  test("Error render in component ProductInfo", async () => {
    const id = "13";
    render(<ProductInfo id={id} />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText("Return")).toBeInTheDocument();
      expect(screen.getByText("An error has occurred:")).toBeInTheDocument();
    });
  });
});

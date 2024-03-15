import { describe, expect, test } from "vitest";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

import ProductInfo from "src/components/ProductInfo";
import { useGetProductByIdQuery } from "src/libs/rtk-query";
import { Provider } from "react-redux";
import { store } from "src/app/store";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

function Wrapper(props: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
}
const renderProductInfo = (id: string) => {
  return render(<ProductInfo id={id} />, { wrapper: Wrapper });
};
// describe("ProductInfo", () => {
//   test("renders hook", async () => {
//     renderHook(() => useGetProductByIdQuery("1"), { wrapper: Wrapper });
//     renderProductInfo("1");

//     await waitFor(() => {
//       expect(screen.getByText("Product Info")).toBeInTheDocument();

//       expect(screen.getByText("Color:mock-color")).toBeInTheDocument();
//       expect(screen.getByText("Name:mock-name")).toBeInTheDocument();
//       expect(screen.getByText("Year:2022")).toBeInTheDocument();
//     });
//   });
// });

describe("ProductInfo component", () => {
  test("renders hook", async () => {
    const id = "1";
    render(<ProductInfo id={id} />, { wrapper: Wrapper });

    // Wait for the component to render after receiving data
    await waitFor(() => {
      expect(screen.getByText("Product Info")).toBeInTheDocument();
      expect(screen.getByText(`Id:${id}`)).toBeInTheDocument();

      expect(screen.getByText("Color:mock-color")).toBeInTheDocument();
      expect(screen.getByText("Name:mock-name")).toBeInTheDocument();
      expect(screen.getByText("Year:2022")).toBeInTheDocument();
    });
  });
});

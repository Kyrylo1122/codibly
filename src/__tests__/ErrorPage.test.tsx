import { render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "src/components/ErrorPage";
import { describe, expect, test } from "vitest";

function Wrapper(props: { children: ReactNode }) {
  return <BrowserRouter>{props.children}</BrowserRouter>;
}

describe("Error page", () => {
  test("Check render test", async () => {
    const error = { status: 404, data: {} };
    render(<ErrorPage error={error} />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText("Return")).toBeInTheDocument();
      expect(screen.getByText("An error has occurred:")).toBeInTheDocument();
    });
  });
});

import { screen, waitFor } from "@testing-library/react";

import ErrorPage from "src/components/ErrorPage";
import { renderWithProviders } from "src/utils/test-utils";
import { describe, expect, test } from "vitest";

describe("Error page", () => {
  test("Check render test", async () => {
    const error = { status: 404, data: {} };
    renderWithProviders(<ErrorPage error={error} />);
    await waitFor(() => {
      expect(screen.getByText("Return")).toBeInTheDocument();
      expect(screen.getByText("An error has occurred:")).toBeInTheDocument();
    });
  });
});

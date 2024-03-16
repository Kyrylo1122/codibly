import { render, screen, waitFor } from "@testing-library/react";

import ErrorPage from "src/components/ErrorPage";
import { describe, expect, test } from "vitest";
import wrapper from "src/utils/test-utils";

describe("Error page", () => {
  test("Error render", async () => {
    const error = { status: 404, data: {} };
    render(<ErrorPage error={error} />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/return/i)).toBeInTheDocument();
      expect(screen.getByText("An error has occurred:")).toBeInTheDocument();
    });
  });
});

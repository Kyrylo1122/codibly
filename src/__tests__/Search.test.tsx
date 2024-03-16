import { fireEvent, render, screen } from "@testing-library/react";
import Search from "src/components/Search";
import wrapper from "src/utils/test-utils";
import { describe, expect, test } from "vitest";

describe("Search header", () => {
  render(<Search />, { wrapper });
  const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

  test("Render input test", async () => {
    expect(input).toBeInTheDocument();
  });
  test("negative change value test", async () => {
    fireEvent.change(input, { target: { value: "abce" } });
    expect(input?.value).not.toBe("abce");
  });
  test("positive change value test", async () => {
    fireEvent.change(input, { target: { value: "23" } });
    expect(input?.value).toBe("23");
  });
  test("Empty value test", async () => {
    fireEvent.change(input, { target: { value: "dfg" } });
    expect(input?.value).toBe("");
  });
});

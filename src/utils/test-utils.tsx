import { Provider } from "react-redux";
import { store } from "src/app/store";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { within } from "@testing-library/react";
import { expect } from "vitest";
export default function wrapper(props: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
}

export const checkRowContents = ({
  row,
  id,
  name,
  year,
  role,
}: {
  row: HTMLElement;
  id: number | string;
  name: string;
  year: number | string;
  role: string;
}) => {
  const columns = within(row).getAllByRole(role);
  expect(columns).toHaveLength(3);
  expect(columns[0]).toHaveTextContent(id.toString());
  expect(columns[1]).toHaveTextContent(name);
  expect(columns[2]).toHaveTextContent(year.toString());
};

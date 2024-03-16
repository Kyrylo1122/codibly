import { BrowserRouter as Router } from "react-router-dom";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import searchReducer from "src/features/search/searchSlice";
import { ReactNode } from "react";
import { RootState, store } from "src/app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: typeof store;
}

export const renderWithProviders = (
  ui: ReactNode,
  extendedRenderOptions: ExtendedRenderOptions = {}
) => {
  const {
    preloadedState = {},
    store = configureStore({
      reducer: combineReducers({ search: searchReducer }),
      preloadedState,
    }),
    ...renderOptions
  } = extendedRenderOptions;
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

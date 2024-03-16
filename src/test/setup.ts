import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { afterAll, beforeAll } from "vitest";
import { afterEach } from "node:test";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

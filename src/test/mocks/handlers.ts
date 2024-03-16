import { http, HttpResponse } from "msw";
export const mockedProductIdOne = {
  data: {
    id: 1,
    name: "cerulean",
    year: 2000,
    color: "#98B2D1",
    pantone_value: "15-4020",
  },
  support: {
    url: "https://reqres.in/#support-heading",
    text: "To keep ReqRes free, contributions towards server costs are appreciated!",
  },
};
export const handlers = [
  http.get("https://reqres.in/api/products/1", () => {
    return HttpResponse.json(
      {
        ...mockedProductIdOne,
      },
      { status: 200 }
    );
  }),
];

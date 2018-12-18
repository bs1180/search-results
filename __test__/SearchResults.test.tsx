import * as React from "react";
import { render } from "react-testing-library";
import { SearchResultsPage } from "../pages";
import * as api from "../lib/api";
jest.mock("../lib/api");

describe("Homepage", () => {
  it("calls API from getInitialProps correctly", async () => {
    jest.spyOn(api, "getSearchResults").mockImplementation(() => Promise.resolve({ results: [], count: 0 }));

    const mockContext: any = {
      query: {}
    };

    const res = await SearchResultsPage.getInitialProps(mockContext);

    expect(res.count).toEqual(0);
  });
  it("passes querystring values to API", async () => {
    const mockApi = jest
      .spyOn(api, "getSearchResults")
      .mockImplementation(() => Promise.resolve({ results: [], count: 0 }));

    const mockContext: any = {
      query: {
        page: 2
      }
    };

    await SearchResultsPage.getInitialProps(mockContext);

    expect(mockApi).toHaveBeenCalledWith({ page: 2 });
  });
  it("renders empty results if no results", async () => {
    const props: any = {
      results: [],
      router: {
        query: {}
      }
    };

    const { getByText } = render(<SearchResultsPage {...props} />);

    expect(getByText("Sorry, no results")).toMatchSnapshot();
  });
});

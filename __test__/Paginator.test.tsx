import * as React from "react";
import { render } from "react-testing-library";
import { Paginator } from "../components/Paginator";
import "jest-dom/extend-expect";

describe("Paginator", () => {
  it("generates correct links", async () => {
    const props: any = {
      pageCount: 3,
      router: {
        query: {
          page: 2
        }
      }
    };

    const { getByText, getAllByTestId } = render(<Paginator {...props} />);

    expect(getByText("Previous")).toHaveAttribute("href", "?page=1");
    expect(getByText("Next")).toHaveAttribute("href", "?page=3");
    expect(getAllByTestId("pagination-link")).toHaveLength(3);
  });
});

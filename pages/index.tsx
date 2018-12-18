import * as React from "react";
import { NextContext } from "next";
import { withRouter, WithRouterProps } from "next/router";
import { getSearchResults } from "../lib/api";
import { SearchResult, SortOrder, QueryParams } from "../lib/types";
import Card from "../components/Card";
import Select from "../components/Select";
import EmptyResults from "../components/EmptyResults";
import Layout from "../components/Layout";
import Paginator from "../components/Paginator";
import { RESULTS_SIZE } from "../lib/config";
if (process.env.NODE_ENV !== "test") {
  require("../styles/styles.css");
}

interface Props {
  results: SearchResult[];
  count: number;
  sortedBy: SortOrder;
}

export class SearchResultsPage extends React.Component<WithRouterProps<QueryParams> & Props> {
  static defaultProps = {
    results: []
  };

  static async getInitialProps(ctx: NextContext<QueryParams>) {
    const { sort, page } = ctx.query;

    const { results, count, sortedBy } = await getSearchResults({ sort, page: page ? parseInt(page) : undefined });

    return { results, count, sortedBy };
  }

  handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // We put search parameters (i.e. sort order) in the URL to give a more consistent user experience if they bookmark it, share it with others etc.
    // Changing the sort order also returns to the first page of results
    const url = {
      pathname: "/",
      query: {
        sort: e.target.value
      }
    };
    this.props.router.push(url, url);
  };

  render() {
    const {
      results,
      count,
      router: {
        query: { sort }
      }
    } = this.props;

    const sortable = [
      { value: SortOrder.highestPrice, label: "Highest Price" },
      { value: SortOrder.lowestPrice, label: "Lowest Price" },
      { value: SortOrder.longestTour, label: "Longest Tour" },
      { value: SortOrder.shortestTour, label: "Shortest Tour" }
    ];

    const totalPages = Math.ceil(count / RESULTS_SIZE);

    return (
      <Layout title="Search Results">
        {results.length === 0 ? (
          <EmptyResults />
        ) : (
          <div className="max-w-xl mx-auto flex flex-col my-4 px-4">
            <div className="flex justify-between items-center flex-col-reverse sm:flex-row">
              <Paginator pageCount={totalPages} />
              <Select onChange={this.handleSort} value={sort} options={sortable} />
            </div>
            {results.map(result => (
              <Card key={result.id} result={result} />
            ))}
            <Paginator pageCount={totalPages} />
          </div>
        )}
      </Layout>
    );
  }
}

export default withRouter(SearchResultsPage);

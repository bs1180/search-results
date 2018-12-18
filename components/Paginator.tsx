import * as React from "react";
import Link from "next/link";
import cx from "classnames";
import { withRouter, WithRouterProps } from "next/router";
import { QueryParams } from "../lib/types";

const Button = props => <a className="mx-4 no-underline hover:underline text-sm text-black" {...props} />;

export const Paginator: React.SFC<WithRouterProps<QueryParams> & { pageCount: number }> = ({
  pageCount,
  router
}) => {
  const current = parseInt(router.query.page) || 1;

  const links = Array.from(Array(pageCount).keys()).map(i => {
    const page = i + 1;

    const classes = cx(
      "px-3 py-2 border-grey text-black border-t border-b border-l no-underline bg-white text-sm",
      {
        "font-bold": page === current,
        "border-r": page === pageCount
      }
    );

    return (
      <Link key={page} href={{ query: { ...router.query, page } }} passHref>
        <a className={classes} data-testid="pagination-link">
          {page}
        </a>
      </Link>
    );
  });

  return (
    <div className="flex items-center justify-center sm:justify-start my-6">
      {current > 1 && (
        <Link href={{ query: { ...router.query, page: current - 1 } }} passHref>
          <Button>Previous</Button>
        </Link>
      )}
      <div>{links}</div>
      {current < pageCount && (
        <Link href={{ query: { ...router.query, page: current + 1 } }} passHref>
          <Button>Next</Button>
        </Link>
      )}
    </div>
  );
};

export default withRouter(Paginator);

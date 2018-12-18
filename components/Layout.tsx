import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import useProgress from "../hooks/usePretendProgress";
import ProgressBar from "./ProgressBar";

type Props = {
  title?: string;
};

const Layout: React.SFC<Props> = ({ children, title = "" }) => {
  const { progress, active, start, stop } = useProgress();

  useEffect(() => {
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", stop);
    Router.events.on("routeChangeError", stop);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", stop);
      Router.events.off("routeChangeError", stop);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
      </Head>
      {active && <ProgressBar progress={progress} />}
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;

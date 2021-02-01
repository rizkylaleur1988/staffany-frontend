import "tailwindcss/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import NextNprogress from "nextjs-progressbar";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <Fragment>
      <Component {...pageProps} />
      <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height="2" />
    </Fragment>
  );
}

export default MyApp;

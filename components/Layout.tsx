/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment, FunctionComponent } from "preact";
import { Head } from "$fresh/src/runtime/head.ts";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="支持跳出微信，从微信内打开任意app，和下载连接"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>⚡️跳出微信-wxopen</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;

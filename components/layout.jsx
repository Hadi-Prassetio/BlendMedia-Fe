import Navbar from "./navbar/navbar";
import Head from "next/head";

export default function Layout({
  children,
  pageTitle,
  showLogin,
  setShowLogin,
  counter,
}) {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel='icon' href='https://ibox.co.id/static/logo/iboxlogo2.png' />
      </Head>
      <Navbar
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        counter={counter}
      />
      <div>{children}</div>
    </div>
  );
}

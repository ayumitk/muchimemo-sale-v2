import "../styles/global.css";
import { AppProps } from "next/app";

import { useEffect } from "react";
import { init } from "../utils/ga";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    init(process.env.NEXT_PUBLIC_G);
  }, []);
  return <Component {...pageProps} />;
};

export default App;

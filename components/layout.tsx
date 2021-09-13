import Head from "next/head";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/solid";
import config from "../config";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@muchimemo" />
        <meta name="twitter:site" content="@muchimemo" />
        <meta property="og:site_name" content={config.siteTitleAlt} />
      </Head>

      <header className="mb-4 border-b-4 border-gray-900">
        <div className="border-b border-gray-900 mb-1">
          <div className="container max-w-3xl">
            <div className="pt-8 pb-5 text-center">
              <Link href="/">
                <a className="hover:text-gray-600 inline-block relative">
                  <svg
                    className="h-9 sm:h-10 mx-auto mb-1 fill-current"
                    viewBox="0 0 111 25"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path d="M11.6 11.4l4.1-2.1c1.6 4.3 3.2 8.7 4.6 12.9l-4.2 1.9c-.1-.2-.3-.6-.5-1.2s-.3-1-.4-1.4c-4.9.9-10 1.4-15.1 1.7L0 18.6c.6 0 1.3-.1 2.1-.1C3.7 13 5.1 7.2 6.3 1.1l4.5 1c-1 5.3-2.2 10.6-3.7 16 2.3-.3 4.5-.6 6.5-.9-.1-.7-.8-2.6-2-5.8zM24.1 16.6V9.2c.6.9 1.1 1.4 1.5 1.4h6.8V7.3c-1.3.1-3.3.1-5.9.1V2.8c3.7 0 6.6-.2 8.6-.5s4-.9 5.8-1.7l1.3 4.6c-1.7.8-3.5 1.4-5.3 1.7v3.7h5.4c.4 0 .9-.5 1.5-1.4v7.5c-.6-.9-1.1-1.4-1.5-1.4h-5.6c-.3 2.9-1.2 5.1-2.4 6.5s-3.3 2.4-6 3L27 20.2c1.7-.4 3-.9 3.7-1.6.7-.7 1.2-1.8 1.4-3.2h-6.6c-.2-.1-.7.3-1.4 1.2zM54.4 8.3c-2.1 0-4.3.1-6.5.1v-4c5.3 0 10.6-.2 16.1-.5l.1 4c-2.8.2-4.9.9-6.3 2-1.4 1.2-2.1 2.7-2.1 4.5 0 1.4.4 2.6 1.1 3.4.7.8 1.7 1.2 2.8 1.2.6 0 1.4-.1 2.4-.3l.4 4.1c-1 .2-2 .4-3 .4-2.4 0-4.2-.8-5.7-2.3-1.4-1.5-2.1-3.5-2.1-6.1 0-1.2.3-2.4.8-3.6s1.1-2.1 2-2.9zm8.2 5.8l-2.1 1.2c-.5-1.3-1.1-2.5-1.7-3.8l2.1-1.2c.7 1.3 1.2 2.6 1.7 3.8zm3.1-.7l-2.2 1.2c-.6-1.4-1.2-2.7-1.7-3.9L64 9.4c.5 1.1 1.1 2.4 1.7 4zM81.5.8l4.6 1.1c-.8 3.8-2.1 7.3-3.9 10.6 2 2.2 3.9 4.1 5.5 5.9l-2.9 4c-1.7-1.9-3.4-3.9-5.3-5.9-2.2 3-5 5.6-8.4 7.8L68.4 20c2.9-2.1 5.4-4.4 7.3-7-1.8-1.8-3.6-3.6-5.5-5.1l2.8-4c1.5 1.3 3.3 3 5.4 5 1.3-2.4 2.3-5.1 3.1-8.1zM103.8 19.3c1.7 0 3.5-.1 5.3-.3l.1 4.9c-2.2.2-4.3.3-6.4.3-2.2 0-3.8-.5-4.6-1.5s-1.2-3-1.2-5.8v-2.2h-4.3c-.4 0-.9.5-1.5 1.4V8.6c.6.9 1.1 1.4 1.5 1.4H97V6.5h-2.3c-.4 0-.9.5-1.5 1.4V.3c.6.9 1.1 1.4 1.5 1.4h12.8c.4 0 .9-.5 1.5-1.4v7.6c-.6-.9-1.1-1.4-1.5-1.4h-5.6V10h7.6c.4 0 .9-.5 1.5-1.4V16c-.6-.9-1.1-1.4-1.5-1.4h-7.6v2.1c0 1.1.1 1.8.3 2.1.2.3.8.5 1.6.5z"></path>
                  </svg>

                  <span className="font-bold text-md sm:text-lg">
                    セール中のオススメ本
                  </span>
                  <span className="absolute -top-1 -right-5 bg-gray-300 text-xs px-1 py-0.5 font-bold transform rotate-12">
                    β版
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="container max-w-3xl">
        <div className="text-sm py-10 text-gray-700">
          <p className="mb-5 bg-gray-100 p-5">
            sale.muchimemo.comは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
          </p>
          <p className="text-sm text-gray-700 mb-5 text-center">
            Powered by{" "}
            <a
              href="https://webservices.amazon.com/paapi5/documentation/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              Amazon Product Advertising API
            </a>
            ,{" "}
            <a
              href="https://affiliate.dmm.com/api/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              DMM.com Webサービス
            </a>
          </p>
          <p className="text-center">
            © 2021 ムチでメモ Made with{" "}
            <HeartIcon className="text-red-600 w-4 h-4 inline" /> in Canada.
          </p>
        </div>
      </footer>
    </div>
  );
}

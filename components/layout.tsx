import Head from "next/head";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/solid";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import config from "../config";
import { SiteLogo, SaleIcon, NewIcon, NewspaperIcon, HomeIcon } from "./svg";
import { SquareAd } from "../components/Adsense";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-noto-sans text-gray-900">
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

      <header>
        <div className="border-b-4 border-gray-900">
          <div className="border-b border-gray-900 mb-1">
            <div className="container max-w-3xl">
              <div className="pt-8 pb-5 text-center">
                <Link href="/">
                  <a className="hover:text-gray-600 inline-block relative">
                    <SiteLogo className="h-9 sm:h-10 mx-auto mb-1 fill-current" />
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
        </div>
        <nav className="border-b border-gray-900">
          <div className="container max-w-3xl flex sm:border-l border-gray-500">
            <Link href="/">
              <a
                className="block flex-1 text-center border-r border-gray-500 sm:py-3 py-1 hover:bg-yellow-50"
                style={{ lineHeight: 1 }}
              >
                <HomeIcon className="w-5 h-5 sm:mr-1 inline-block align-text-bottom font-medium" />
                <span className="text-xs sm:text-base block sm:inline-block">
                  ホーム
                </span>
              </a>
            </Link>
            <Link href="/sale">
              <a
                className="block flex-1 text-center border-r border-gray-500 sm:py-3 py-1 hover:bg-yellow-50"
                style={{ lineHeight: 1 }}
              >
                <SaleIcon className="w-5 h-5 sm:mr-1 inline-block align-text-bottom font-medium" />
                <span className="text-xs sm:text-base block sm:inline-block">
                  セール
                </span>
              </a>
            </Link>
            <Link href="/blog">
              <a
                className="block flex-1 text-center sm:border-r border-gray-500 sm:py-3 py-1 hover:bg-yellow-50"
                style={{ lineHeight: 1 }}
              >
                <NewspaperIcon className="w-5 h-5 sm:mr-1 inline-block align-text-bottom" />
                <span className="text-xs sm:text-base block sm:inline-block font-medium">
                  特集
                </span>
              </a>
            </Link>
            {/* <Link href="/new">
              <a
                className="block flex-1 text-center sm:border-r border-gray-500 sm:py-3 py-1 hover:bg-yellow-50"
                style={{ lineHeight: 1 }}
              >
                <NewIcon className="w-5 h-5 sm:mr-1 inline-block align-text-bottom font-medium" />
                <span className="text-xs sm:text-base block sm:inline-block">
                  新刊BL
                </span>
              </a>
            </Link> */}
          </div>
        </nav>
      </header>

      <main className="container">{children}</main>

      <SquareAd />

      <footer className="container max-w-3xl">
        <div className="text-sm py-10 text-gray-700">
          <p className="mb-6 bg-gray-100 p-5">
            sale.muchimemo.comは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
          </p>
          <nav className="flex justify-center mb-4">
            <Link href="/about">
              <a className="text-blue-700 hover:underline inline-block mr-3">
                このサイトについて
              </a>
            </Link>
            <a
              href="https://muchimemo.com/support/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block mr-3"
            >
              サポート
              <ExternalLinkIcon className="w-4 h-4 inline-block sm:ml-0.5" />
            </a>
            <a
              href="https://muchimemo.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              お問い合わせ
              <ExternalLinkIcon className="w-4 h-4 inline-block sm:ml-0.5" />
            </a>
          </nav>
          <p className="sm:text-sm text-xs text-gray-700 mb-4 text-center px-4">
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
};

export default Layout;

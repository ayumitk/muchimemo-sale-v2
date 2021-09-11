import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import moment from "moment";
import "moment-timezone";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import EbookItem from "../components/user/EbookItem";
import BreadcrumbNav from "../components/user/BreadcrumbNav";

// types
import { Ebook, Sale } from "../interfaces";

export default function Home({ allSales }: { allSales: Array<Sale> }) {
  const [ebookOnSale, setEbookOnSale] = useState<Ebook[]>();
  useEffect(() => {
    const filteredSales = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format();
      const end = moment(sale.saleEnds).add(9, "h").format();
      const diff = moment(end).diff(now);
      return diff >= 0;
    });

    let array: Ebook[] = [];
    filteredSales.forEach((x) => {
      x.ebooks.forEach((y) => {
        array.push(y.ebook);
      });
    });

    const result = array.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });

    result.sort((x) => {
      if (x.isRecommended) {
        return -1;
      } else {
        return 1;
      }
    });

    setEbookOnSale(result);
  }, []);

  const [sort, setSort] = useState<string>("recommended");
  const [reviewCount, setReviewCount] = useState<boolean>(false);
  const [reviewAverage, setReviewAverage] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [recommended, setRecommended] = useState<boolean>(true);

  const sortReviewCount = () => {
    let result = ebookOnSale;
    if (reviewCount) {
      result =
        ebookOnSale &&
        ebookOnSale.sort((a, b) => {
          return a.reviewCount - b.reviewCount;
        });
      setEbookOnSale(result);
      setReviewCount(false);
      setReviewAverage(false);
      setPrice(false);
      setRecommended(false);
      setSort("count");
    } else {
      result =
        ebookOnSale &&
        ebookOnSale.sort((a, b) => {
          return b.reviewCount - a.reviewCount;
        });
      setEbookOnSale(result);
      setReviewCount(true);
      setReviewAverage(false);
      setPrice(false);
      setRecommended(false);
      setSort("count");
    }
  };

  const sortReviewAverage = () => {
    let result = ebookOnSale;
    if (reviewAverage) {
      result =
        ebookOnSale &&
        ebookOnSale.sort((a, b) => {
          return Number(a.reviewAverage) - Number(b.reviewAverage);
        });
      setEbookOnSale(result);
      setReviewAverage(false);
      setReviewCount(false);
      setPrice(false);
      setRecommended(false);
      setSort("average");
    } else {
      result =
        ebookOnSale &&
        ebookOnSale.sort((a, b) => {
          return Number(b.reviewAverage) - Number(a.reviewAverage);
        });
      setEbookOnSale(result);
      setReviewAverage(true);
      setReviewCount(false);
      setPrice(false);
      setRecommended(false);
      setSort("average");
    }
  };

  const sortPrice = () => {
    let result = ebookOnSale;
    if (price) {
      result =
        ebookOnSale &&
        ebookOnSale.sort((a, b) => {
          return a.price - b.price;
        });
      setEbookOnSale(result);
      setPrice(false);
      setReviewCount(false);
      setReviewAverage(false);
      setRecommended(false);
      setSort("price");
    } else {
      result =
        ebookOnSale &&
        ebookOnSale.sort((a, b) => {
          return b.price - a.price;
        });
      setEbookOnSale(result);
      setPrice(true);
      setReviewCount(false);
      setReviewAverage(false);
      setRecommended(false);
      setSort("price");
    }
  };

  const sortRecommended = () => {
    let result = ebookOnSale;
    if (recommended) {
      result =
        ebookOnSale &&
        ebookOnSale.sort((x) => {
          if (x.isRecommended) {
            return 1;
          } else {
            return -1;
          }
        });
      setEbookOnSale(result);
      setRecommended(false);
      setReviewCount(false);
      setReviewAverage(false);
      setPrice(false);
      setSort("recommended");
    } else {
      result =
        ebookOnSale &&
        ebookOnSale.sort((x) => {
          if (x.isRecommended) {
            return -1;
          } else {
            return 1;
          }
        });
      setEbookOnSale(result);
      setRecommended(true);
      setReviewCount(false);
      setReviewAverage(false);
      setPrice(false);
      setSort("recommended");
    }
  };

  return (
    <Layout>
      <Head>
        <title>セール中の全ての作品 - {config.siteTitleAlt}</title>
        <meta name="description" content={config.siteDescription} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`セール中の全ての作品 - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={config.siteDescription} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          property="og:image:alt"
          content={`セール中の全ての作品 - ${config.siteTitleAlt}`}
        />

        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:title"
          content={`セール中の全ての作品 - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={config.siteDescription} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          name="twitter:image:alt"
          content={`セール中の全ての作品 - ${config.siteTitleAlt}`}
        />
      </Head>
      <article className="max-w-3xl mx-auto">
        <BreadcrumbNav pageTitle="セール中の全ての作品" />
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4">
            セール中の全ての作品
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <section>
            <ul className="flex space-x-3 px-4 md:px-6 lg:px-0 text-sm sm:text-base">
              <li>
                <button
                  type="button"
                  onClick={sortReviewCount}
                  className={`hover:text-blue-700 ${
                    sort === "count"
                      ? "text-blue-700 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  レビュー数
                  {reviewCount ? (
                    <ChevronUpIcon className="w-4 sm:w-5 inline-block" />
                  ) : (
                    <ChevronDownIcon className="w-4 sm:w-5 inline-block" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={sortReviewAverage}
                  className={`hover:text-blue-700 ${
                    sort === "average"
                      ? "text-blue-700 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  レビュー評価
                  {reviewAverage ? (
                    <ChevronUpIcon className="w-4 sm:w-5 inline-block" />
                  ) : (
                    <ChevronDownIcon className="w-4 sm:w-5 inline-block" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={sortPrice}
                  className={`hover:text-blue-700 ${
                    sort === "price"
                      ? "text-blue-700 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  価格
                  {price ? (
                    <ChevronUpIcon className="w-4 sm:w-5 inline-block" />
                  ) : (
                    <ChevronDownIcon className="w-4 sm:w-5 inline-block" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={sortRecommended}
                  className={`hover:text-blue-700 ${
                    sort === "recommended"
                      ? "text-blue-700 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  おすすめ
                  {recommended ? (
                    <ChevronUpIcon className="w-4 sm:w-5 inline-block" />
                  ) : (
                    <ChevronDownIcon className="w-4 sm:w-5 inline-block" />
                  )}
                </button>
              </li>
            </ul>
          </section>
          <section>
            <p className="py-3 text-sm text-gray-700 border-t-4 border-gray-900 mt-5 px-4 md:px-6 lg:px-0">
              {ebookOnSale && ebookOnSale.length}作品表示中
            </p>
            <ul className="border-b border-gray-900">
              {ebookOnSale &&
                ebookOnSale.map((ebook) => (
                  <EbookItem key={ebook.id} ebook={ebook} />
                ))}
            </ul>
          </section>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.sale.findMany({
    where: { isPublished: true },
    include: {
      ebooks: {
        include: {
          ebook: {
            include: {
              format: true,
              category: true,
              sales: { include: { sale: true } },
            },
          },
        },
      },
    },
    orderBy: { saleEnds: "asc" },
  });
  const allSales = JSON.parse(JSON.stringify(data));
  return { props: { allSales } };
};

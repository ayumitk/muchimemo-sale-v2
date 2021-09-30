import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import config from "../../config";
import moment from "moment";
import { SearchIcon } from "@heroicons/react/solid";
import adData from "../../config/ad.json";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import EbookItem from "../../components/user/EbookItem";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";
import ShowSaleEnds from "../../components/user/ShowSaleEnds";
import AffiliateBanners from "../../components/user/AffiliateBanners";
import Ad from "../../components/user/Ad";

// types
import { Sale, Ebook, AdData } from "../../interfaces";

export default function SaleDetailPage({ saleDetail }: { saleDetail: Sale }) {
  const description = saleDetail.description
    ? saleDetail.description
    : `
  ${saleDetail.ebooks
    .map((item) => (item.ebook.isRecommended ? `『${item.ebook.title}』` : ""))
    .join("")}など${saleDetail.ebooks.length}作品が対象です！
  `;

  const now = moment().tz("Asia/Tokyo").format();
  const end = moment(saleDetail.saleEnds).add(9, "h").format();
  const diff = moment(end).diff(now);
  let remainingDays = -1;
  if (diff >= 0) {
    remainingDays = Math.trunc(moment.duration(diff).asDays());
  }

  const [ebookOnSale, setEbookOnSale] = useState<Ebook[]>();
  const [mangaCount, setMangaCount] = useState(0);
  const [novelCount, setNovelCount] = useState(0);

  useEffect(() => {
    setEbookOnSale(saleDetail.ebooks.map((item) => item.ebook));

    const manga = saleDetail.ebooks
      .map((item) => item.ebook)
      .filter((ebook) => ebook.formatId === 2);
    setMangaCount(manga.length);

    const novel = saleDetail.ebooks
      .map((item) => item.ebook)
      .filter((ebook) => ebook.formatId === 3);
    setNovelCount(novel.length);
  }, []);

  const [filterManga, setFilterManga] = useState(true);
  const [filterNovel, setFilterNovel] = useState(true);
  const [filterKeyword, setFilterKeyword] = useState("");
  useEffect(() => {
    let filteredEbooks = saleDetail.ebooks.map((item) => item.ebook);

    if (filterKeyword !== "") {
      filteredEbooks =
        filteredEbooks &&
        filteredEbooks.filter((ebook: Ebook) => {
          const parsedAuthors = ebook.authors && JSON.parse(ebook.authors);
          return (
            ebook.title.includes(filterKeyword) ||
            (parsedAuthors && parsedAuthors[0].Name.includes(filterKeyword))
          );
        });
    }

    if (!filterManga) {
      filteredEbooks =
        filteredEbooks &&
        filteredEbooks.filter((ebook) => ebook.formatId !== 2);
    }

    if (!filterNovel) {
      filteredEbooks =
        filteredEbooks &&
        filteredEbooks.filter((ebook) => ebook.formatId !== 3);
    }

    const pickupEbooks = filteredEbooks
      .filter((ebook) => ebook.isPickup)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const recommendedEbooks = filteredEbooks
      .filter((ebook) => ebook.isRecommended && !ebook.isPickup)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const restOfEbooks = filteredEbooks
      .filter((ebook) => !ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const result = pickupEbooks.concat(recommendedEbooks, restOfEbooks);

    filteredEbooks && setEbookOnSale(result);
  }, [filterManga, filterNovel, filterKeyword]);

  const [ad, setAd] = useState<AdData[]>([]);
  useEffect(() => {
    const shuffle = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    setAd(shuffle(adData));
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          {saleDetail.title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={description} />
        <meta
          name="image"
          content={`${config.siteUrl}/images/cover-images/${saleDetail.id}.jpg`}
        />

        <meta
          property="og:url"
          content={`${config.siteUrl}/sale/${saleDetail.id}/`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${saleDetail.title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}/images/cover-images/${saleDetail.id}.jpg`}
        />
        <meta
          property="og:image:alt"
          content={`${saleDetail.title} - ${config.siteTitleAlt}`}
        />

        <meta
          name="twitter:url"
          content={`${config.siteUrl}/sale/${saleDetail.id}/`}
        />
        <meta
          name="twitter:title"
          content={`${saleDetail.title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/images/cover-images/${saleDetail.id}.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content={`${saleDetail.title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={saleDetail.title} sale />
      <article className="max-w-3xl mx-auto">
        <div className="px-4 md:px-6 lg:px-0">
          <ShowSaleEnds remainingDays={remainingDays + 1} className="mb-1" />
          <h1 className="font-black text-2xl sm:text-4xl mb-4 tracking-tight">
            {saleDetail.title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">{description}</p>

          <AffiliateBanners saleId={saleDetail.id} />

          <div className="mt-8 sm:flex items-center">
            <span className="text-sm">絞り込み：</span>
            <button
              type="button"
              className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm focus:outline-none ring-0 ${
                filterManga
                  ? "text-white bg-gray-900 hover:bg-gray-700"
                  : "text-gray-400 bg-gray-200 hover:bg-gray-300 hover:text-gray-500"
              }`}
              onClick={() => setFilterManga(!filterManga)}
            >
              マンガ
              <span className="text-xs ml-1 font-normal">({mangaCount})</span>
            </button>
            <button
              type="button"
              className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm focus:outline-none ring-0 ${
                filterNovel
                  ? "text-white bg-gray-900 hover:bg-gray-700"
                  : "text-gray-400 bg-gray-200 hover:bg-gray-300 hover:text-gray-500"
              } ml-1 mr-2`}
              onClick={() => setFilterNovel(!filterNovel)}
            >
              小説
              <span className="text-xs ml-1 font-normal">({novelCount})</span>
            </button>
            <div className="flex-1 relative mt-2 sm:mt-0">
              <input
                type="text"
                className="pl-7 focus:ring-gray-700 focus:border-gray-700 block border-gray-500 rounded-sm w-full"
                placeholder="タイトル、作家名…"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
              />
              <SearchIcon className="absolute w-5 h-5 left-2 top-3 z-10" />
            </div>
          </div>
        </div>

        <p className="py-3 text-sm text-gray-700 border-t-4 border-gray-900 mt-3 px-4 md:px-6 lg:px-0">
          {ebookOnSale && ebookOnSale.length}作品表示中
        </p>
        <ul className="border-b border-gray-900">
          {ebookOnSale &&
            ebookOnSale.map((ebook, index) => {
              let adIndex = 0;
              if (index === 8) {
                adIndex = 1;
              } else if (index === 14) {
                adIndex = 2;
              }

              return (
                <div key={ebook.id}>
                  {(index === 2 || index === 8 || index === 14) && (
                    <Ad
                      adData={ad[adIndex]}
                      className="border-t border-gray-900 py-4 sm:py-6 text-center"
                    />
                  )}
                  <EbookItem
                    ebook={ebook}
                    key={ebook.id}
                    remainingDays={remainingDays}
                  />
                </div>
              );
            })}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await prisma.sale.findMany();
  const sales = JSON.parse(JSON.stringify(res));

  const paths = sales.map((sale: Sale) => ({
    params: {
      id: sale.id.toString(),
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await prisma.sale.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      ebooks: {
        include: {
          ebook: {
            include: {
              format: true,
              category: true,
              label: true,
              tags: {
                include: {
                  tag: true,
                },
                orderBy: { tag: { name: "asc" } },
              },
            },
          },
        },
        where: {
          ebook: {
            isDeleted: false,
          },
        },
      },
    },
  });
  const saleDetail = JSON.parse(JSON.stringify(res));
  return { props: { saleDetail } };
};

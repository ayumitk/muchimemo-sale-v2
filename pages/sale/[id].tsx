import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import config from "../../config";
import moment from "moment";
import { SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import EbookItem from "../../components/user/EbookItem";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";
import ShowSaleEnds from "../../components/user/ShowSaleEnds";

// types
import { Sale, Ebook } from "../../interfaces";

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
    const recommendedEbooks = saleDetail.ebooks
      .map((item) => item.ebook)
      .filter((ebook) => ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const restOfEbooks = saleDetail.ebooks
      .map((item) => item.ebook)
      .filter((ebook) => !ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const result = recommendedEbooks.concat(restOfEbooks);
    setEbookOnSale(result);

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

    const recommendedEbooks = filteredEbooks
      .filter((ebook) => ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const restOfEbooks = filteredEbooks
      .filter((ebook) => !ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const result = recommendedEbooks.concat(restOfEbooks);

    filteredEbooks && setEbookOnSale(result);
  }, [filterManga, filterNovel, filterKeyword]);

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
      <article className="max-w-3xl mx-auto">
        <BreadcrumbNav pageTitle={saleDetail.title} />
        <div className="px-4 md:px-6 lg:px-0">
          <ShowSaleEnds remainingDays={remainingDays + 1} className="mb-1" />
          <h1 className="font-bold text-2xl sm:text-4xl mb-4">
            {saleDetail.title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">{description}</p>

          {saleDetail.id === 24 && (
            <div className="mt-7 sm:flex">
              <div className="sm:mr-4">
                <div className="font-bold mb-1 text-sm sm:text-base">
                  ▼コミックシーモアの特設ページ
                </div>
                <a
                  href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731152&vc_url=https%3A%2F%2Fwww.cmoa.jp%2Fspecial%2F%3Fpage_id%3D210910_hanaotonohi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block sm:w-64 w-52"
                >
                  <img
                    src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3549505&pid=886731152"
                    height={1}
                    width={0}
                  />
                  <Image
                    src="https://www.cmoa.jp/auto/images/210910_hanaotonohi/upper_20210910.jpg"
                    alt="コミックシーモアの特設ページ"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.svg"
                    width={770}
                    height={320}
                  />
                </a>
              </div>
              <div className="sm:mr-4">
                <div className="font-bold mb-1 text-sm sm:text-base">
                  ▼Renta!の特設ページ
                </div>
                <a
                  href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731192&vc_url=https%3A%2F%2Frenta.papy.co.jp%2Frenta%2Fsc%2Ffrm%2Fpage%2Ftopics%2Fbc_35593_20210910.htm%3Fref%3Dvc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block sm:w-44 w-36"
                >
                  <img
                    src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3549505&pid=886731192"
                    height={1}
                    width={0}
                  />
                  <Image
                    src="https://img.papy.co.jp/lc/renta/img/label/tp_35593_l_02.png?09100000"
                    alt="Renta!の特設ページ"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.svg"
                    width={360}
                    height={225}
                  />
                </a>
              </div>
              <div>
                <div className="font-bold mb-1 text-sm sm:text-base">
                  ▼DMMブックスの特設ページ
                </div>
                <a
                  href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Flist%2Fcampaign%2FhuG80eyHiK2LhrCW1aHD1OHo05mO0dWYht*rg6HkAgCK3bV2IHCCsa2Gs5%2CQtMQ_%2F%3Ffloor%3DGbl&af_id=muchimemo-001&ch=toolbar&ch_id=link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block sm:w-60 w-48"
                >
                  <Image
                    src="https://ebook-assets.dmm.com/p/bnr/dc/rotation/book_210825173207hanaoto_g.jpg"
                    alt="DMMブックスの特設ページ"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.svg"
                    width={500}
                    height={220}
                  />
                </a>
              </div>
            </div>
          )}

          {saleDetail.id === 23 && (
            <div className="mt-7">
              <div className="font-bold mb-1">
                ▼コミックシーモアの特設ページ
              </div>
              <a
                href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731152&vc_url=https%3A%2F%2Fwww.cmoa.jp%2Fspecial%2F%3Fpage_id%3D210910_gentosyacomics_coupon%26page_no%3D2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block sm:w-64 w-52"
              >
                <img
                  src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3549505&pid=886731152"
                  height={1}
                  width={0}
                />
                <Image
                  src="https://www.cmoa.jp/auto/images/210910_gentosyacomics_coupon/upper_20210910_2.jpg"
                  alt="コミックシーモアの特設ページ"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.svg"
                  width={770}
                  height={320}
                />
              </a>
            </div>
          )}

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
            ebookOnSale.map((ebook) => (
              <EbookItem ebook={ebook} key={ebook.id} />
            ))}
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

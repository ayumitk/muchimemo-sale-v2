import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import Image from "next/image";
import moment from "moment";
import "moment-timezone";
import Link from "next/link";
import blog from "../config/blog.json";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import adData from "../config/ad.json";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import SaleItem from "../components/user/SaleItem";
import PickupItem from "../components/user/PickupItem";
import Ad from "../components/user/Ad";

// types
import { Sale, Ebook, AdData } from "../interfaces";

export default function HomePage({
  sales,
  pickupEbooks,
}: {
  sales: Array<Sale>;
  pickupEbooks: Array<Ebook>;
}) {
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
        <title>{config.siteTitleAlt}</title>
        <meta name="description" content={config.siteDescription} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.siteTitleAlt} />
        <meta property="og:description" content={config.siteDescription} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta property="og:image:alt" content={config.siteTitleAlt} />

        <meta name="twitter:url" content={config.siteUrl} />
        <meta name="twitter:title" content={config.siteTitleAlt} />
        <meta name="twitter:description" content={config.siteDescription} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta name="twitter:image:alt" content={config.siteTitleAlt} />
      </Head>

      <section className="max-w-3xl mx-auto">
        <Link href={`/sale/27`}>
          <a className="block" style={{ lineHeight: 0 }}>
            <Image
              src="/images/cover-images/27.jpg"
              alt="【30%OFF】いつの時代も尊い… 祥伝社 ヒストリカルBL特集 (9/29まで)"
              width={1200}
              height={630}
              placeholder="blur"
              blurDataURL="/images/placeholder.svg"
              className="hover:opacity-80"
            />
          </a>
        </Link>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-0">
        <h1 className="my-5 sm:my-10 text-sm sm:text-base text-center">
          BLジャンルを中心に、Kindleセール中のマンガ・小説をおすすめコメント付きで紹介します！
        </h1>

        <section className="mb-8 sm:mb-14">
          <h2
            className="font-black text-xl sm:text-2xl bg-gray-900 text-white inline-block relative pl-4 pr-8 mb-4"
            style={{ height: `50px`, lineHeight: `50px` }}
          >
            セール中の注目作品
            <span
              className="absolute top-0 right-0"
              style={{
                borderWidth: `25px 15px 25px 0px`,
                borderColor: `transparent #fff transparent transparent`,
                borderStyle: `solid`,
              }}
            ></span>
          </h2>
          <ul className="grid grid-flow-col grid-cols-3 sm:grid-cols-6 grid-rows-2 sm:grid-rows-1 gap-3">
            {pickupEbooks.length > 0 &&
              pickupEbooks.map((ebook) => {
                return (
                  <PickupItem
                    ebook={ebook}
                    sale={ebook.sales[0].sale}
                    key={ebook.id}
                  />
                );
              })}
          </ul>
        </section>

        <Ad adData={ad[0]} className="mb-10 sm:mb-16 text-center" />

        <section className="mb-16">
          <h2
            className="font-black text-xl sm:text-2xl bg-gray-900 text-white inline-block relative pl-4 pr-8 mb-4"
            style={{ height: `50px`, lineHeight: `50px` }}
          >
            おすすめBL特集
            <span
              className="absolute top-0 right-0"
              style={{
                borderWidth: `25px 15px 25px 0px`,
                borderColor: `transparent #fff transparent transparent`,
                borderStyle: `solid`,
              }}
            ></span>
          </h2>
          <ul className="grid grid-flow-col grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 gap-3">
            {blog.map((item) => {
              if (
                item.slug === "foreign-country" ||
                item.slug === "2020" ||
                item.slug === "bl-ish-manga" ||
                item.slug === "historical-bl-manga"
              )
                return (
                  <li
                    className="border-4 border-gray-900 hover:bg-yellow-50"
                    key={item.slug}
                  >
                    <a
                      className="flex items-center"
                      href={`https://muchimemo.com/bl-manga/${item.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="sm:w-36 w-24" style={{ lineHeight: 0 }}>
                        <Image
                          src={item.image}
                          alt={`${item.title}のイメージ画像`}
                          width={800}
                          height={800}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.svg"
                          className="hover:opacity-80"
                        />
                      </div>
                      <h2 className="flex-1 mx-3 leading-snug line-clamp-3">
                        <span className="font-bold">{item.title}</span>
                      </h2>
                    </a>
                  </li>
                );
            })}
          </ul>
          <div className="text-center mt-5">
            <Link href="/blog">
              <a className="rounded bg-gray-900 text-white py-3 px-5 inline-block hover:bg-gray-700 font-medium">
                <ArrowCircleRightIcon className="w-5 h-5 mr-1 inline-block align-text-bottom" />
                特集をもっと見る
              </a>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-4">
            <h2
              className="font-black text-xl sm:text-2xl bg-gray-900 text-white inline-block relative pl-4 pr-8"
              style={{ height: `50px`, lineHeight: `50px` }}
            >
              終了間近のセール
              <span
                className="absolute top-0 right-0"
                style={{
                  borderWidth: `25px 15px 25px 0px`,
                  borderColor: `transparent #fff transparent transparent`,
                  borderStyle: `solid`,
                }}
              ></span>
            </h2>
          </div>
          <ul>
            {sales.map((sale, index) => (
              <div key={sale.id}>
                {index === 1 && (
                  <Ad adData={ad[1]} className="text-center mb-8" />
                )}
                <SaleItem sale={sale} />
              </div>
            ))}
          </ul>
          <div className="text-center">
            <Link href="/sale">
              <a className="rounded bg-gray-900 text-white py-3 px-5 inline-block hover:bg-gray-700 font-medium">
                <ArrowCircleRightIcon className="w-5 h-5 mr-1 inline-block align-text-bottom" />
                セール情報をもっと見る
              </a>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.sale.findMany({
    where: {
      isPublished: true,
      saleEnds: { gte: moment().tz("Asia/Tokyo").format() },
    },
    include: {
      ebooks: {
        include: {
          ebook: true,
        },
      },
    },
    orderBy: { saleEnds: "asc" },
    take: 4,
  });
  const sales = JSON.parse(JSON.stringify(data));

  const pickup = await prisma.ebook.findMany({
    where: {
      isPickup: true,
      sales: {
        some: {
          sale: {
            saleEnds: { gte: moment().tz("Asia/Tokyo").format() },
          },
        },
      },
    },
    include: {
      sales: {
        include: {
          sale: true,
        },
      },
    },
    take: 6,
  });
  const pickupEbooks = JSON.parse(JSON.stringify(pickup));

  return { props: { sales, pickupEbooks } };
};

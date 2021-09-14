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

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import SaleItem from "../components/user/SaleItem";
import PickupItem from "../components/user/PickupItem";

// types
import { Sale, Ebook } from "../interfaces";

export default function HomePage({
  allSales,
  pickupEbooks,
}: {
  allSales: Array<Sale>;
  pickupEbooks: Array<Ebook>;
}) {
  const [orderedSales, setOrderedSales] = useState<Sale[]>([]);

  useEffect(() => {
    const onSale = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format();
      const end = moment(sale.saleEnds).add(9, "h").format();
      const diff = moment(end).diff(now);
      return diff >= 0;
    });
    setOrderedSales(onSale.slice(0, 4));
  }, [allSales]);

  const pickupSale = (sales: Sale[]) => {
    const onSale = sales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format();
      const end = moment(sale.saleEnds).add(9, "h").format();
      const diff = moment(end).diff(now);
      return diff >= 0;
    });
    return onSale;
  };

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
        <Link href={`/sale/24`}>
          <a className="block" style={{ lineHeight: 0 }}>
            <Image
              src="/images/cover-images/24.jpg"
              alt="【50％ポイント還元】花音の日 (9/16まで)"
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

        <section className="mb-16">
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
                if (
                  pickupSale(ebook.sales.map((item) => item.sale)).length > 0
                ) {
                  return (
                    <PickupItem
                      ebook={ebook}
                      sale={pickupSale(ebook.sales.map((item) => item.sale))[0]}
                      key={ebook.id}
                    />
                  );
                }
              })}
          </ul>
        </section>

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
            {orderedSales.map((sale) => (
              <SaleItem sale={sale} key={sale.id} />
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
    where: { isPublished: true },
    include: {
      ebooks: {
        include: {
          ebook: true,
        },
        where: {
          ebook: {
            isDeleted: false,
          },
        },
      },
    },
    orderBy: { saleEnds: "asc" },
  });
  const allSales = JSON.parse(JSON.stringify(data));

  const pickup = await prisma.ebook.findMany({
    where: { isPickup: true },
    include: {
      sales: {
        include: {
          sale: {},
        },
      },
    },
  });
  const pickupEbooks = JSON.parse(JSON.stringify(pickup));

  return { props: { allSales, pickupEbooks } };
};

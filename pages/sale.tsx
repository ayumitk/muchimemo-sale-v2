import { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import moment from "moment";
import "moment-timezone";
import adData from "../config/ad.json";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import SaleItem from "../components/user/SaleItem";
import BreadcrumbNav from "../components/user/BreadcrumbNav";
import Ad from "../components/user/Ad";

// types
import { Sale, AdData } from "../interfaces";

export default function SalePage({ allSales }: { allSales: Array<Sale> }) {
  const [orderedSales, setOrderedSales] = useState<Sale[]>([]);

  useEffect(() => {
    const onSale = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format();
      const end = moment(sale.saleEnds).add(9, "h").format();
      const diff = moment(end).diff(now);
      return diff >= 0;
    });

    const expiredSale = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format();
      const end = moment(sale.saleEnds).add(9, "h").format();
      const diff = moment(end).diff(now);
      return diff < 0;
    });

    setOrderedSales(onSale.concat(expiredSale));
  }, [allSales]);

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

  const title = "開催中のセール一覧";

  return (
    <Layout>
      <Head>
        <title>
          {title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={config.siteDescription} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={`${config.siteUrl}/sale`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={config.siteDescription} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          property="og:image:alt"
          content={`${config.siteUrl}${config.siteBanner}`}
        />

        <meta name="twitter:url" content={`${config.siteUrl}/sale`} />
        <meta
          name="twitter:title"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta name="twitter:description" content={config.siteDescription} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          name="twitter:image:alt"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={title} />
      <article className="max-w-3xl mx-auto px-4 md:px-6 lg:px-0">
        <section>
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-6 mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base mb-10">
            BLジャンルを中心に、Kindleセール中のマンガ・小説をおすすめコメント付きで紹介します！
          </p>
        </section>

        <section>
          <ul>
            {orderedSales.map((sale, index) => {
              let adIndex = 0;
              if (index === 8) {
                adIndex = 1;
              } else if (index === 14) {
                adIndex = 2;
              }
              return (
                <Fragment key={sale.id}>
                  {(index === 2 || index === 8 || index === 14) && (
                    <li>
                      <Ad adData={ad[adIndex]} className="mb-8 text-center" />
                    </li>
                  )}
                  <SaleItem sale={sale} />
                </Fragment>
              );
            })}
          </ul>
        </section>
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
  return { props: { allSales } };
};

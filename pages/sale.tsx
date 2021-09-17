import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import moment from "moment";
import "moment-timezone";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import SaleItem from "../components/user/SaleItem";
import BreadcrumbNav from "../components/user/BreadcrumbNav";
// import Adsense from "../components/user/Adsense";

// types
import { Sale } from "../interfaces";

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
              if (index === 2) {
                return (
                  <div key={sale.id}>
                    <SaleItem sale={sale} key={sale.id} />
                    {/* <Adsense feed className="mb-8" /> */}
                  </div>
                );
              }
              return <SaleItem sale={sale} key={sale.id} />;
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

import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import config from "../config";
import moment from "moment";
import "moment-timezone";

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
      const now = moment().tz("Asia/Tokyo").format("YYYY,MM,DD");
      const nowArr = now.split(",");

      const end = moment(sale.saleEnds).add(9, "h").format("YYYY,MM,DD");
      const endArr = end.split(",");

      const diff = moment(endArr).diff(moment(nowArr), "days");

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
  }, [allSales]);

  return (
    <Layout>
      <Head>
        <title>セール中の全ての作品 - {config.siteTitle}</title>
        <meta name="description" content={config.siteDescription} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`セール中の全ての作品 - ${config.siteTitle}`}
        />
        <meta property="og:description" content={config.siteDescription} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          property="og:image:alt"
          content={`セール中の全ての作品 - ${config.siteTitle}`}
        />

        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:title"
          content={`セール中の全ての作品 - ${config.siteTitle}`}
        />
        <meta name="twitter:description" content={config.siteDescription} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          name="twitter:image:alt"
          content={`セール中の全ての作品 - ${config.siteTitle}`}
        />
      </Head>
      <article className="max-w-3xl mx-auto">
        <BreadcrumbNav pageTitle="セール中の全ての作品" />
        <h1 className="font-bold text-2xl sm:text-4xl mb-4">
          セール中の全ての作品
        </h1>
        <div className="max-w-3xl mx-auto">
          <section>
            <p className="py-3 text-sm text-gray-700 border-t-4 border-gray-900 mt-5">
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

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await prisma.ebook.findMany({
//     where: {
//       sales: {
//         some: {},
//       },
//     },
//     include: {
//       sales: { include: { sale: true } },
//       format: true,
//       category: true,
//     },
//     orderBy: { isRecommended: "desc" },
//   });
//   const allEbooks = JSON.parse(JSON.stringify(data));
//   return { props: { allEbooks } };
// };

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

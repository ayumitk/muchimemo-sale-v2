import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import config from "../config";
import Image from "next/image";
import moment from "moment";
import "moment-timezone";
import Link from "next/link";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

// components
import Layout from "../components/layout";
import SaleItem from "../components/user/SaleItem";

// types
import { Sale } from "../interfaces";

export default function Home({ allSales }: { allSales: Array<Sale> }) {
  const [orderedSales, setOrderedSales] = useState<Sale[]>([]);
  useEffect(() => {
    const onSale = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format("YYYY,MM,DD");
      const nowArr = now.split(",");

      const end = moment(sale.saleEnds).add(9, "h").format("YYYY,MM,DD");
      const endArr = end.split(",");

      const diff = moment(endArr).diff(moment(nowArr), "days");

      return diff >= 0;
    });

    const expiredSale = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format("YYYY,MM,DD");
      const nowArr = now.split(",");

      const end = moment(sale.saleEnds).add(9, "h").format("YYYY,MM,DD");
      const endArr = end.split(",");

      const diff = moment(endArr).diff(moment(nowArr), "days");

      return diff < 0;
    });

    setOrderedSales(onSale.concat(expiredSale));
  }, [allSales]);

  return (
    <Layout>
      <Head>
        <title>{config.siteTitle}</title>
        <meta name="description" content={config.siteDescription} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.siteTitle} />
        <meta property="og:description" content={config.siteDescription} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta property="og:image:alt" content={config.siteTitle} />

        <meta name="twitter:url" content={config.siteUrl} />
        <meta name="twitter:title" content={config.siteTitle} />
        <meta name="twitter:description" content={config.siteDescription} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta name="twitter:image:alt" content={config.siteTitle} />
      </Head>
      <div className="max-w-3xl mx-auto">
        <section>
          <h1 className="mb-2 mt-10">
            BLジャンルを中心に、今セール中のマンガ・小説をおすすめコメント付きで紹介します！
          </h1>
          <div className="flex flex-wrap items-center mb-2">
            <div className="w-16 mr-2 mt-1" style={{ lineHeight: 0 }}>
              <Image
                src="/images/amazon-logo.png"
                alt="Amazonのロゴ"
                width={550}
                height={166}
              />
            </div>
            <div className="w-16 mr-2" style={{ lineHeight: 0 }}>
              <Image
                src="/images/renta-logo.png"
                alt="Renta!のロゴ"
                width={550}
                height={144}
              />
            </div>
            <div className="w-12 mr-2" style={{ lineHeight: 0 }}>
              <Image
                src="/images/cmoa-logo.png"
                alt="シーモアのロゴ"
                width={500}
                height={214}
              />
            </div>
            <div className="w-24 mr-2" style={{ lineHeight: 0 }}>
              <Image
                src="/images/dmm-logo.svg"
                alt="DMMブックスのロゴ"
                width={240}
                height={56}
              />
            </div>
            の商品ページへのリンク付き。
          </div>
          <p className="text-sm text-gray-700 mb-12">
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
        </section>

        <section className="mb-16">
          <h2
            className="font-bold text-xl sm:text-2xl bg-gray-900 text-white inline-block relative pl-4 pr-8"
            style={{ height: `50px`, lineHeight: `50px` }}
          >
            セール中の作品から探す
            <span
              className="absolute top-0 right-0"
              style={{
                borderWidth: `25px 15px 25px 0px`,
                borderColor: `transparent #fff transparent transparent`,
                borderStyle: `solid`,
              }}
            ></span>
          </h2>

          <Link href="/all-ebooks">
            <a className="mt-4 flex items-center border-4 border-gray-900 hover:bg-yellow-50 px-4 py-4 sm:py-5 sm:p-6 font-bold text-lg">
              <ArrowCircleRightIcon className="w-6 h-6 mr-1" />{" "}
              セール中の全ての作品を見る
            </a>
          </Link>
        </section>

        <section>
          <div className="mb-4">
            <h2
              className="font-bold text-xl sm:text-2xl bg-gray-900 text-white inline-block relative pl-4 pr-8"
              style={{ height: `50px`, lineHeight: `50px` }}
            >
              開催中のセールから探す
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
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.sale.findMany({
    where: { isPublished: true },
    include: { ebooks: { include: { ebook: true } } },
    orderBy: { saleEnds: "asc" },
  });
  const allSales = JSON.parse(JSON.stringify(data));
  return { props: { allSales } };
};

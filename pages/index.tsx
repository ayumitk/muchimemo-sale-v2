import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import Image from "next/image";
import moment from "moment";
import "moment-timezone";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import SaleItem from "../components/user/SaleItem";
import PickupItem from "../components/user/PickupItem";

// types
import { Sale, Ebook } from "../interfaces";

export default function Home({
  allSales,
  pickupEbooks,
}: {
  allSales: Array<Sale>;
  pickupEbooks: Array<Ebook>;
}) {
  const [orderedSales, setOrderedSales] = useState<Sale[]>([]);

  // console.log(pickupEbooks);

  useEffect(() => {
    const onSale = allSales.filter((sale) => {
      const now = moment().tz("Asia/Tokyo").format();
      const end = moment(sale.saleEnds).add(9, "h").format();
      const diff = moment(end).diff(now);
      return diff >= 0;
    });
    setOrderedSales(onSale);
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
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-0">
        <section className="mb-10">
          <h1 className="mb-1 mt-10">
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
        </section>

        <section className="mb-16">
          <h2
            className="font-bold text-xl sm:text-2xl bg-gray-900 text-white inline-block relative pl-4 pr-8 mb-4"
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

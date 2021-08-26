import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import prisma from "../../lib/prisma";
import config from "../../config";

// components
import Layout from "../../components/layout";
import EbookItem from "../../components/user/EbookItem";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";

// types
import { Sale, Ebook } from "../../interfaces";

export default function SaleDetailPage({ saleDetail }: { saleDetail: Sale }) {
  const description = `
  ${saleDetail.ebooks
    .map((item) => (item.ebook.isRecommended ? `『${item.ebook.title}』` : ""))
    .join("")}など${saleDetail.ebooks.length}作品が対象です！
  `;

  const [ebookOnSale, setEbookOnSale] = useState<Ebook[]>();
  useEffect(() => {
    const result = saleDetail.ebooks
      .map((item) => item.ebook)
      .sort((x: Ebook) => {
        if (x.isRecommended) {
          return -1;
        } else {
          return 1;
        }
      });
    setEbookOnSale(result);
  }, [saleDetail]);

  return (
    <Layout>
      <Head>
        <title>
          {saleDetail.title} - {config.siteTitle}
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
          content={`${saleDetail.title} - ${config.siteTitle}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}/images/cover-images/${saleDetail.id}.jpg`}
        />
        <meta
          property="og:image:alt"
          content={`${saleDetail.title} - ${config.siteTitle}`}
        />

        <meta
          name="twitter:url"
          content={`${config.siteUrl}/sale/${saleDetail.id}/`}
        />
        <meta
          name="twitter:title"
          content={`${saleDetail.title} - ${config.siteTitle}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/images/cover-images/${saleDetail.id}.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content={`${saleDetail.title} - ${config.siteTitle}`}
        />
      </Head>
      <article className="max-w-3xl mx-auto">
        <BreadcrumbNav pageTitle={saleDetail.title} />
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4">
            {saleDetail.title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">
            {saleDetail.ebooks.map((item) =>
              item.ebook.isRecommended ? `『${item.ebook.title}』` : ""
            )}
            など
            <span className="text-red-600 font-bold">
              {saleDetail.ebooks.length}作品
            </span>
            が対象です！
          </p>
        </div>

        <p className="py-3 text-sm text-gray-700 border-t-4 border-gray-900 mt-5 px-4 md:px-6 lg:px-0">
          {saleDetail.ebooks.length}作品表示中
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
      },
    },
  });
  const saleDetail = JSON.parse(JSON.stringify(res));

  return { props: { saleDetail } };
};

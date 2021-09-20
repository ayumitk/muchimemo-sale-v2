import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../../config";
import moment from "moment";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import EbookItem from "../../components/user/EbookItem";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";
import Adsense from "../../components/user/Adsense";

// types
import { Ebook } from "../../interfaces";

export default function booksOfTheMonthPage({ ebooks }: { ebooks: Ebook[] }) {
  const title = "2021年9月に読んだおすすめBLマンガ･小説";
  const description =
    "新刊やセールで購入したマンガや小説の中から、オススメの作品をご紹介します。一部、非BL作品も含まれてます。";
  const pageId = "2021-09";

  return (
    <Layout>
      <Head>
        <title>
          {title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={description} />
        <meta
          name="image"
          content={`${config.siteUrl}/images/cover-images/${pageId}.jpg`}
        />

        <meta property="og:url" content={`${config.siteUrl}/sale/${pageId}/`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}/images/cover-images/${pageId}.jpg`}
        />
        <meta
          property="og:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />

        <meta
          name="twitter:url"
          content={`${config.siteUrl}/sale/${pageId}/`}
        />
        <meta
          name="twitter:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/images/cover-images/${pageId}.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={title} saleDetail />
      <article className="max-w-3xl mx-auto">
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-black text-2xl sm:text-4xl mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">{description}</p>
        </div>

        <p className="py-3 text-sm text-gray-700 border-t-4 border-gray-900 mt-10 px-4 md:px-6 lg:px-0">
          {ebooks && ebooks.length}作品表示中
        </p>
        <ul className="border-b border-gray-900">
          {ebooks &&
            ebooks.map((ebook, index) => {
              if (index === 2) {
                return (
                  <div key={ebook.id}>
                    <EbookItem
                      ebook={ebook}
                      key={ebook.id}
                      remainingDays={-1}
                    />
                    <Adsense
                      feed
                      className="border-t border-gray-900 px-3 sm:px-6 py-5"
                    />
                  </div>
                );
              }
              return (
                <EbookItem ebook={ebook} key={ebook.id} remainingDays={-1} />
              );
            })}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.ebook.findMany({
    where: {
      readAt: {
        gte: new Date("2021-09-01"),
        lt: new Date("2021-09-30"),
      },
      isDeleted: false,
    },
    include: {
      format: true,
      category: true,
    },
    orderBy: [{ isRecommended: "desc" }, { id: "desc" }],
  });
  const ebooks = JSON.parse(JSON.stringify(data));

  return { props: { ebooks } };
};

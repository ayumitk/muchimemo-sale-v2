import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next";
import config from "../../config";
import moment from "moment";
import "moment/locale/ja";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import adData from "../../config/ad.json";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import EbookItem from "../../components/user/EbookItem";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";
import Ad from "../../components/user/Ad";

// types
import { Ebook, AdData, Label } from "../../interfaces";

export default function labelDetailPage({
  ebooks,
  label,
}: {
  ebooks: Ebook[];
  label: Label;
}) {
  const title = `${label.name}のおすすめ本`;
  const description = `新刊やセールで購入した${label.name}の本の中から、オススメの作品をご紹介します。`;

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
        <title>
          {title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={description} />
        <meta
          name="image"
          content={`${config.siteUrl}/images/cover-images/.jpg`}
        />

        <meta property="og:url" content={`${config.siteUrl}/sale//`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}/images/cover-images/.jpg`}
        />
        <meta
          property="og:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />

        <meta name="twitter:url" content={`${config.siteUrl}/sale//`} />
        <meta
          name="twitter:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/images/cover-images/.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={title} />
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
              let adIndex = 0;
              if (index === 8) {
                adIndex = 1;
              } else if (index === 14) {
                adIndex = 2;
              }

              return (
                <div key={ebook.id}>
                  {(index === 2 || index === 8 || index === 14) && (
                    <Ad
                      adData={ad[adIndex]}
                      className="border-t border-gray-900 py-4 sm:py-6 text-center"
                    />
                  )}
                  <EbookItem ebook={ebook} key={ebook.id} remainingDays={-1} />
                </div>
              );
            })}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await prisma.label.findMany({
    select: {
      slug: true,
    },
  });
  const paths = JSON.parse(JSON.stringify(res)).map((item: Label) => ({
    params: {
      id: item.slug,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let slug = {};
  if (params && params.id) {
    slug = params.id;
  }

  const ebooksData = await prisma.ebook.findMany({
    where: {
      label: {
        slug: slug,
      },
      // NOT: { comment: null },
      // isRecommended: true,
    },
    include: {
      format: true,
      category: true,
      label: true,
    },
    orderBy: [
      { isRecommended: "desc" },
      { comment: "asc" },
      { authors: "desc" },
    ],
  });
  const ebooks = JSON.parse(JSON.stringify(ebooksData));

  const labelData = await prisma.label.findMany({
    where: {
      slug: slug,
    },
  });
  const label = JSON.parse(JSON.stringify(labelData[0]));

  return { props: { ebooks, label } };
};

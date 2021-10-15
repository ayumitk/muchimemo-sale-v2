import { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next";
import config from "../../config";
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

  const [orderedEbooks, setOrderedEbooks] = useState<Ebook[]>();
  useEffect(() => {
    const result = ebooks.sort((a: Ebook, b: Ebook) =>
      a.title.localeCompare(b.title)
    );
    setOrderedEbooks(result);
  }, [ebooks]);

  return (
    <Layout>
      <Head>
        <title>
          {title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={description} />
        <meta
          name="image"
          content={`${config.siteUrl}/images/cover-images/common.jpg`}
        />

        <meta
          property="og:url"
          content={`${config.siteUrl}/label/${label.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}/images/cover-images/common.jpg`}
        />
        <meta
          property="og:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />

        <meta
          name="twitter:url"
          content={`${config.siteUrl}/label/${label.slug}`}
        />
        <meta
          name="twitter:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/images/cover-images/common.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={label.name} label />
      <article className="max-w-3xl mx-auto">
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-black text-2xl sm:text-4xl mb-4 tracking-tight font-noto-sans">
            {title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">{description}</p>
        </div>

        <p className="py-3 text-sm text-gray-700 border-t-4 border-gray-900 mt-10 px-4 md:px-6 lg:px-0">
          {orderedEbooks && orderedEbooks.length}作品表示中
        </p>
        <ul className="border-b border-gray-900">
          {orderedEbooks &&
            orderedEbooks.map((ebook, index) => {
              let adIndex = 0;
              if (index === 8) {
                adIndex = 1;
              } else if (index === 14) {
                adIndex = 2;
              }

              return (
                <Fragment key={ebook.id}>
                  {(index === 2 || index === 8 || index === 14) && (
                    <li>
                      <Ad
                        adData={ad[adIndex]}
                        className="border-t border-gray-900 py-4 sm:py-6 text-center"
                      />
                    </li>
                  )}
                  <EbookItem ebook={ebook} remainingDays={-1} />
                </Fragment>
              );
            })}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await prisma.label.findMany({
    where: {
      ebooks: {
        some: {
          OR: [{ NOT: { comment: null } }, { isRecommended: true }],
        },
      },
    },
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
      isDeleted: false,
      OR: [{ NOT: { comment: null } }, { isRecommended: true }],
    },
    include: {
      format: true,
      category: true,
      label: true,
      tags: {
        include: {
          tag: true,
        },
        orderBy: { tag: { name: "asc" } },
      },
    },
    orderBy: [{ isRecommended: "desc" }, { authors: "desc" }],
  });
  const ebooks = JSON.parse(JSON.stringify(ebooksData));

  const labelData = await prisma.label.findUnique({
    where: {
      slug: String(slug),
    },
  });
  const label = JSON.parse(JSON.stringify(labelData));

  return { props: { ebooks, label } };
};

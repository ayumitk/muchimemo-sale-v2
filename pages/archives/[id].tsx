import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
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
import { Ebook, AdData } from "../../interfaces";

export default function archiveDetailPage({
  ebooks,
  paths,
}: {
  ebooks: Ebook[];
  paths: string[];
}) {
  const router = useRouter();
  const { id } = router.query;

  const currentIndex = paths.findIndex((x) => x === id);
  const endOfIndex = paths.length - 1;
  const prevId = currentIndex === endOfIndex ? "" : paths[currentIndex + 1];
  const nextId = currentIndex === 0 ? "" : paths[currentIndex - 1];

  const year = moment(id).format("Y") + "年";
  const month = moment(id).format("MMMM");

  const title = `${year}${month}に読んだおすすめBLマンガ･小説`;
  const description =
    "新刊やセールで購入したマンガや小説の中から、オススメの作品をご紹介します。一部、非BL作品も含まれてます。";

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
          content={`${config.siteUrl}/images/cover-images/${id}.jpg`}
        />

        <meta property="og:url" content={`${config.siteUrl}/sale/${id}/`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}/images/cover-images/${id}.jpg`}
        />
        <meta
          property="og:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />

        <meta name="twitter:url" content={`${config.siteUrl}/sale/${id}/`} />
        <meta
          name="twitter:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/images/cover-images/${id}.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={title} archive />
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
        <nav className="flex mt-6 px-3 sm:px-0">
          {prevId !== "" && (
            <Link href={`/archives/${prevId}`}>
              <a className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <ArrowCircleLeftIcon
                  className="-ml-1 mr-1 h-5 w-5"
                  aria-hidden="true"
                />
                {`${moment(prevId).format("Y") + "年"}${moment(prevId).format(
                  "MMMM"
                )}`}
              </a>
            </Link>
          )}
          {nextId !== "" && (
            <Link href={`/archives/${nextId}`}>
              <a className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-auto">
                {`${moment(nextId).format("Y") + "年"}${moment(nextId).format(
                  "MMMM"
                )}`}
                <ArrowCircleRightIcon
                  className="-mr-1 ml-1 h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  interface Ebook {
    readAt: string;
  }

  const res = await prisma.ebook.findMany({
    where: { isDeleted: false, NOT: { readAt: null } },
    select: {
      readAt: true,
    },
  });
  const ebooks = JSON.parse(JSON.stringify(res));
  const allEbooks = ebooks.map((ebook: Ebook) => ({
    readAt: ebook.readAt.slice(0, 7),
  }));
  const objectKeys = allEbooks
    .map((ebook: Ebook) => ebook.readAt)
    .filter((x: Ebook, i: number, self: Ebook[]) => self.indexOf(x) === i);

  const paths = objectKeys.map((key: string) => ({
    params: {
      id: key.toString(),
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let readAt = {};
  if (params && params.id) {
    const start = params.id + "-01";
    const end = params.id + "-" + moment(params.id, "YYYY-MM").daysInMonth();
    readAt = {
      gte: moment(start).format(),
      lt: moment(end).format(),
    };
  }

  const res = await prisma.ebook.findMany({
    where: {
      readAt: readAt,
      isDeleted: false,
    },
    include: {
      format: true,
      category: true,
      label: true,
    },
    orderBy: [{ categoryId: "asc" }, { authors: "desc" }],
  });
  const ebooks = JSON.parse(JSON.stringify(res));

  const pathsData = await prisma.ebook.findMany({
    where: {
      NOT: { readAt: null },
      isDeleted: false,
    },
    select: { readAt: true },
    orderBy: [{ readAt: "desc" }],
  });
  const paths = JSON.parse(JSON.stringify(pathsData))
    .map((path: { readAt: string }) => path.readAt.slice(0, 7))
    .filter(
      (x: { readAt: string }, i: number, self: { readAt: string }[]) =>
        self.indexOf(x) === i
    );

  return { props: { ebooks, paths } };
};

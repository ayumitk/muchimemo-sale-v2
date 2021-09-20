import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import moment from "moment";
import "moment/locale/ja";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";

// types
import { Ebook } from "../interfaces";

interface Archives {
  id: string;
  ebooks: Ebook[];
}

export default function ArchivesPage({ ebooks }: { ebooks: Ebook[] }) {
  const title = "毎月のおすすめBLマンガ･小説";
  const description =
    "新刊やセールで購入したマンガや小説の中から、オススメの作品をご紹介します。一部、非BL作品も含まれてます。";

  const [archives, setArchives] = useState<Archives[]>([]);

  useEffect(() => {
    const allEbooks = ebooks.map((ebook) => ({
      ...ebook,
      readAt: ebook.readAt && ebook.readAt.slice(0, 7),
    }));

    const group = _.groupBy(allEbooks, "readAt");

    const result = Object.keys(group)
      .map((k) => {
        return { id: k, ebooks: group[k] };
      })
      .sort((a, b) => {
        if (Number(a.id.replace("-", "")) > Number(b.id.replace("-", ""))) {
          return -1;
        } else {
          return 1;
        }
      });

    setArchives(result);
  }, [ebooks]);

  return (
    <Layout>
      <Head>
        <title>
          {title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={description} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={`${config.siteUrl}/sale`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
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
        <meta name="twitter:description" content={description} />
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
          <p className="text-sm sm:text-base mb-10">{description}</p>
        </section>

        <section>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {archives &&
              archives.map((archive) => {
                const year = moment(archive.id).format("Y") + "年";
                const month = moment(archive.id).format("MMMM");
                return (
                  <li key={archive.id}>
                    <Link href={`/archives/${archive.id}`}>
                      <a className="border-t-4 border-gray-900 block hover:bg-yellow-50">
                        <h2 className="text-2xl sm:text-3xl font-black py-1 sm:py-2 text-center border-b border-gray-900 mb-2">
                          {year}
                          {month}
                        </h2>
                        <div className="flex">
                          {archive.ebooks.map((ebook, index) => {
                            if (index < 4) {
                              return (
                                <div key={ebook.id} style={{ lineHeight: 0 }}>
                                  <Image
                                    src={
                                      ebook.imageUrl
                                        ? ebook.imageUrl
                                        : "/images/placeholder.svg"
                                    }
                                    alt={`${ebook.title}の表紙`}
                                    width={
                                      ebook.imageWidth ? ebook.imageWidth : 343
                                    }
                                    height={
                                      ebook.imageHeight
                                        ? ebook.imageHeight
                                        : 500
                                    }
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.svg"
                                  />
                                </div>
                              );
                            }
                          })}
                        </div>
                        <div className="text-sm text-gray-700 pb-8 pt-2">
                          {archive.ebooks.map((ebook, index) => {
                            if (index < 4) {
                              return (
                                <div key={ebook.id} className="line-clamp-1">
                                  {ebook.title}
                                </div>
                              );
                            }
                          })}
                          など、{archive.ebooks.length}作品
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.ebook.findMany({
    where: { isDeleted: false, NOT: { readAt: null } },
    orderBy: [
      { categoryId: "asc" },
      { isRecommended: "desc" },
      { authors: "desc" },
    ],
  });
  const ebooks = JSON.parse(JSON.stringify(data));
  return { props: { ebooks } };
};

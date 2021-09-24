import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import _ from "lodash";
import adData from "../config/ad.json";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";
import ArchiveItem from "../components/user/ArchiveItem";
import Ad from "../components/user/Ad";

// types
import { Ebook, AdData, Archive } from "../interfaces";

export default function ArchivesPage({ ebooks }: { ebooks: Ebook[] }) {
  const title = "毎月のおすすめBLマンガ･小説";
  const description =
    "新刊やセールで購入したマンガや小説の中から、オススメの作品をご紹介します。一部、非BL作品も含まれてます。";

  const [archives, setArchives] = useState<Archive[]>([]);
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
              archives.map((archive, index) => {
                let adIndex = 0;
                if (index === 8) {
                  adIndex = 1;
                } else if (index === 14) {
                  adIndex = 2;
                }
                return (
                  <div key={archive.id}>
                    {(index === 2 || index === 8 || index === 14) && (
                      <Ad
                        adData={ad[adIndex]}
                        className="mb-8 text-center"
                        grid
                      />
                    )}
                    <ArchiveItem index={index} archive={archive} />
                  </div>
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

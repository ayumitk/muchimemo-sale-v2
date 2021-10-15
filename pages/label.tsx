import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../config";
import adData from "../config/ad.json";
import Link from "next/link";

// db
import prisma from "../lib/prisma";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";
import Ad from "../components/user/Ad";

// types
import { Label, AdData } from "../interfaces";

interface Category {
  id: number;
  name: string;
  labels: Label[];
}

export default function LabelPage({ categories }: { categories: Category[] }) {
  const title = "レーベル";
  const description = "レーベル別におすすめのマンガ・小説を紹介します。";

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
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-6 mb-4 tracking-tight font-noto-sans">
            {title}
          </h1>
          <p className="text-sm sm:text-base mb-10">{description}</p>
        </section>

        <section>
          <ul className="">
            {categories &&
              categories.map((category) => {
                if (category.id !== 1) {
                  return (
                    <div className="mb-10" key={category.id}>
                      <h2 className="text-2xl font-bold mb-2">
                        {category.name}
                      </h2>
                      <div>
                        {category.labels.map((label) => {
                          if (label.id !== 1) {
                            return (
                              <div key={label.id}>
                                <Link href={`/label/${label.slug}`}>
                                  <a className="text-blue-700 hover:underline mr-1">
                                    {label.name}{" "}
                                    {label.ebooks.length > 0 &&
                                      `(${label.ebooks.length})`}
                                  </a>
                                </Link>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                }
              })}
          </ul>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      labels: {
        where: {
          ebooks: {
            some: {
              OR: [{ NOT: { comment: null } }, { isRecommended: true }],
            },
          },
        },
        select: {
          id: true,
          slug: true,
          name: true,
          ebooks: {
            where: {
              OR: [{ NOT: { comment: null } }, { isRecommended: true }],
            },
          },
        },
        orderBy: [{ name: "asc" }],
      },
    },
    orderBy: [{ id: "asc" }],
  });
  const categories = JSON.parse(JSON.stringify(data));

  return { props: { categories } };
};

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
import { Tag, AdData } from "../interfaces";

export default function TagPage({ tags }: { tags: Tag[] }) {
  const title = "タグ";
  const description = "タグ別におすすめのマンガ・小説を紹介します。";

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
            {tags &&
              tags.map((tag) => {
                if (tag.id !== 1) {
                  return (
                    <div key={tag.id}>
                      <Link href={`/tag/${tag.slug}`}>
                        <a className="text-blue-700 hover:underline mr-1">
                          {tag.name}{" "}
                          {tag.ebooks &&
                            tag.ebooks.length > 0 &&
                            `(${tag.ebooks.length})`}
                        </a>
                      </Link>
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
  const data = await prisma.tag.findMany({
    where: {
      OR: [{ id: 3 }, { id: 6 }, { id: 20 }, { id: 15 }],
      ebooks: {
        some: {
          OR: [
            { NOT: { ebook: { comment: null } } },
            { ebook: { isRecommended: true } },
          ],
        },
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      ebooks: {
        where: {
          OR: [
            { NOT: { ebook: { comment: null } } },
            { ebook: { isRecommended: true } },
          ],
        },
      },
    },
    orderBy: [{ name: "asc" }],
  });
  const tags = JSON.parse(JSON.stringify(data));

  return { props: { tags } };
};

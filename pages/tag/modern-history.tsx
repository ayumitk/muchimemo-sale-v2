import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../../config";
import "moment-timezone";
import Link from "next/link";
import adData from "../../config/ad.json";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import Ad from "../../components/user/Ad";
import EbookItem from "../../components/user/EbookItem";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";
import TagNav from "../../components/user/TagNav";

// types
import { Tag, AdData, Ebook } from "../../interfaces";

export default function ModernHistoryPage({
  tag,
  blEbooks,
  broEbooks,
  allTags,
}: {
  tag: Tag;
  blEbooks: Ebook[];
  broEbooks: Ebook[];
  allTags: Tag[];
}) {
  const title = `${tag.name}のおすすめBL•ブロマンス作品`;
  const description = `明治•大正•昭和あたりの日本、西部開拓時代の北米、20世紀のヨーロッパなどを舞台にした、ちょっと昔のレトロで浪漫たっぷりなボーイズラブ作品`;

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
          content={`${config.siteUrl}/images/cover-images/common.jpg`}
        />

        <meta property="og:url" content={`${config.siteUrl}/${tag.slug}`} />
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

        <meta name="twitter:url" content={`${config.siteUrl}/${tag.slug}`} />
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
      <BreadcrumbNav pageTitle={tag.name} />
      <article className="max-w-3xl mx-auto">
        <header className="px-4 md:px-6 lg:px-0 mb-8">
          <h1 className="font-black text-2xl sm:text-4xl mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">{description}</p>
          <TagNav tags={allTags} />
        </header>

        <h2 className="sm:text-3xl text-xl font-black sm:py-4 py-3 border-t-4 border-gray-900 px-4 md:px-6 lg:px-0">
          ボーイズラブ
          <span className="text-gray-700 text-sm font-normal ml-2">
            {blEbooks.length}作品
          </span>
        </h2>
        <ul className="border-b border-gray-900">
          {blEbooks.map((ebook) => (
            <EbookItem ebook={ebook} key={ebook.id} remainingDays={-1} />
          ))}
        </ul>

        <h2 className="sm:text-3xl text-xl font-black sm:py-4 py-3 border-t-4 border-gray-900 px-4 md:px-6 lg:px-0 mt-20">
          ブロマンス･BLっぽい
          <span className="text-gray-700 text-sm font-normal ml-2">
            {broEbooks.length}作品
          </span>
        </h2>
        <ul className="border-b border-gray-900">
          {broEbooks.map((ebook) => (
            <EbookItem ebook={ebook} key={ebook.id} remainingDays={-1} />
          ))}
        </ul>

        <footer className="px-4 md:px-6 lg:px-0">
          <TagNav tags={allTags} />
        </footer>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.tag.findUnique({
    where: {
      id: 20,
    },
  });
  const tag = JSON.parse(JSON.stringify(data));

  const tagData = await prisma.tag.findMany({
    where: {
      OR: [{ id: 3 }, { id: 6 }, { id: 20 }, { id: 15 }],
    },
    orderBy: { name: "asc" },
  });
  const allTags = JSON.parse(JSON.stringify(tagData));

  const blData = await prisma.ebook.findMany({
    where: {
      categoryId: 2,
      AND: [
        { tags: { some: { tagId: 20 } } },
        // { tags: { none: { tagId: 13 } } },
      ],
      isDeleted: false,
    },
    include: {
      category: true,
      format: true,
      label: true,
      tags: {
        include: {
          tag: true,
        },
        orderBy: { tag: { name: "asc" } },
      },
    },
    orderBy: [{ isRecommended: "desc" }, { title: "asc" }],
  });
  const blEbooks = JSON.parse(JSON.stringify(blData));

  const broData = await prisma.ebook.findMany({
    where: {
      AND: [
        { tags: { some: { tagId: 20 } } },
        { tags: { some: { tagId: 15 } } },
        // { tags: { none: { tagId: 13 } } },
      ],
      isDeleted: false,
    },
    include: {
      category: true,
      format: true,
      label: true,
      tags: {
        include: {
          tag: true,
        },
        orderBy: { tag: { name: "asc" } },
      },
    },
    orderBy: [{ isRecommended: "desc" }, { title: "asc" }],
  });
  const broEbooks = JSON.parse(JSON.stringify(broData));

  return { props: { tag, blEbooks, broEbooks, allTags } };
};

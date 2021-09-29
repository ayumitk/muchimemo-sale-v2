import { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import config from "../../config";
import Image from "next/image";
import moment from "moment";
import "moment-timezone";
import Link from "next/link";
import blog from "../../config/blog.json";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import adData from "../../config/ad.json";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import SaleItem from "../../components/user/SaleItem";
import PickupItem from "../../components/user/PickupItem";
import Ad from "../../components/user/Ad";

// types
import { Tag, AdData, Ebook } from "../../interfaces";

export default function ThreesomePage({
  tag,
  blEbooks,
  broEbooks,
}: {
  tag: Tag;
  blEbooks: Ebook[];
  broEbooks: Ebook[];
}) {
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
        <title>{config.siteTitleAlt}</title>
        <meta name="description" content={config.siteDescription} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.siteTitleAlt} />
        <meta property="og:description" content={config.siteDescription} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta property="og:image:alt" content={config.siteTitleAlt} />

        <meta name="twitter:url" content={config.siteUrl} />
        <meta name="twitter:title" content={config.siteTitleAlt} />
        <meta name="twitter:description" content={config.siteDescription} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta name="twitter:image:alt" content={config.siteTitleAlt} />
      </Head>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">BL</h2>
        {blEbooks.map((ebook) => (
          <div key={ebook.id}>{ebook.title}</div>
        ))}
        <h2 className="text-2xl font-bold mb-2 mt-10">ブロマンス･BLっぽい</h2>
        {broEbooks.map((ebook) => (
          <div key={ebook.id}>{ebook.title}</div>
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.tag.findMany({
    where: {
      id: 3,
    },
  });
  const tag = JSON.parse(JSON.stringify(data))[0];

  const blData = await prisma.ebook.findMany({
    where: {
      categoryId: 2,
      AND: [
        { tags: { some: { tagId: 3 } } },
        { tags: { none: { tagId: 13 } } },
      ],
    },
    include: {
      category: true,
      format: true,
      label: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: [{ isRecommended: "asc" }],
  });
  const blEbooks = JSON.parse(JSON.stringify(blData));

  const broData = await prisma.ebook.findMany({
    where: {
      AND: [
        { tags: { some: { tagId: 3 } } },
        { tags: { some: { tagId: 15 } } },
        { tags: { none: { tagId: 13 } } },
      ],
    },
    include: {
      category: true,
      format: true,
      label: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: [{ isRecommended: "asc" }],
  });
  const broEbooks = JSON.parse(JSON.stringify(broData));

  return { props: { tag, blEbooks, broEbooks } };
};

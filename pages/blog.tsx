import { useEffect, useState } from "react";
import Head from "next/head";
import config from "../config";
import blog from "../config/blog.json";
import adData from "../config/ad.json";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";
import BlogItem from "../components/user/BlogItem";
import Ad from "../components/user/Ad";

// types
import { AdData } from "../interfaces";

export default function BlogPage() {
  const title = "オススメBLマンガ･小説特集";
  const description =
    "私の中で殿堂入りしているオススメのBLマンガ･小説、一般雑誌に掲載されてるけどBL好きが読んだら大興奮する作品、ブロマンス作品、歴史･SF･海外が舞台などテーマごとのオススメ作品を紹介します。";

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

        <meta property="og:url" content={`${config.siteUrl}/blog`} />
        <meta property="og:type" content="article" />
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
          content={`${title} - ${config.siteTitleAlt}`}
        />

        <meta name="twitter:url" content={`${config.siteUrl}/blog`} />
        <meta
          name="twitter:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          name="twitter:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={title} />
      <article className="max-w-3xl mx-auto">
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-6 mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base mb-10">
            {description}
          </p>
          <ul className="border-t-4 border-dotted border-gray-900">
            {blog.map((item, index) => {
              let adIndex = 0;
              if (index === 8) {
                adIndex = 1;
              } else if (index === 14) {
                adIndex = 2;
              }
              return (
                <div key={item.slug}>
                  {(index === 2 || index === 8 || index === 14) && (
                    <Ad
                      adData={ad[adIndex]}
                      className="sm:py-8 py-4 border-b-4 border-dotted border-gray-900 text-center"
                    />
                  )}
                  <BlogItem key={item.slug} post={item} />
                </div>
              );
            })}
          </ul>
        </div>
      </article>
    </Layout>
  );
}

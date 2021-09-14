import Head from "next/head";
import config from "../config";
import blog from "../config/blog.json";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";
import BlogItem from "../components/user/BlogItem";
import { InFeedAd } from "../components/Adsense";

export default function BlogPage() {
  const title = "オススメBLマンガ･小説特集";
  const description =
    "私の中で殿堂入りしているオススメのBLマンガ･小説、一般雑誌に掲載されてるけどBL好きが読んだら大興奮する作品、ブロマンス作品、歴史･SF･海外が舞台などテーマごとのオススメ作品を紹介します。";

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
              if (index === 2) {
                return (
                  <div key={item.slug}>
                    <BlogItem post={item} />
                    <InFeedAd />
                  </div>
                );
              }
              return <BlogItem key={item.slug} post={item} />;
            })}
          </ul>
        </div>
      </article>
    </Layout>
  );
}

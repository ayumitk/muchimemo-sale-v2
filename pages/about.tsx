import Head from "next/head";
import config from "../config";
import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { GetStaticProps } from "next";

import { getPostData } from "../lib/posts";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";

export default function AboutPage({
  postData,
}: {
  postData: {
    contentHtml: string;
  };
}) {
  const title = "このサイトについて";
  const description = "";

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
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-10 mb-6 tracking-tight">
            {title}
          </h1>
          <div className="mx-auto sm:w-20 w-16 mb-4">
            <Image
              src="/images/gina-avatar.jpg"
              alt="ジーナのアイコン"
              className="rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div
            className="postData"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postData = await getPostData("about");
  return {
    props: {
      postData,
    },
  };
};

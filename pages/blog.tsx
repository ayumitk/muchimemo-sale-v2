import Head from "next/head";
import config from "../config";
import blog from "../config/blog.json";
import Image from "next/image";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";

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
      <article className="max-w-3xl mx-auto">
        <BreadcrumbNav pageTitle={title} />
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4">{title}</h1>
          <p className="text-gray-700 text-sm sm:text-base mb-10">
            {description}
          </p>
          <ul className="border-t-4 border-dotted border-gray-900">
            {blog.map((item) => (
              <li
                key={item.slug}
                className="flex sm:py-8 py-5 border-b-4 border-dotted border-gray-900"
              >
                <a
                  href={`https://muchimemo.com/bl-manga/${item.slug}/`}
                  className="sm:w-60 w-28 sm:mr-5 mr-3 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={item.image}
                    alt={`${item.title}のイメージ画像`}
                    width={800}
                    height={800}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.svg"
                    className="hover:opacity-80"
                  />
                </a>
                <div className="flex-1">
                  <h2 className="sm:my-3 my-1">
                    <a
                      href={`https://muchimemo.com/bl-manga/${item.slug}/`}
                      className="font-bold sm:text-3xl text-base hover:text-gray-700 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </h2>
                  <p className="text-gray-700 text-xs sm:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Layout>
  );
}

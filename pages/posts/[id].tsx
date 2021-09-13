import { getAllPostIds, getPostData } from "../../lib/posts";
import { useEffect, useState } from "react";
import Head from "next/head";
import config from "../../config";
import moment from "moment";

// components
import Layout from "../../components/layout";
import BreadcrumbNav from "../../components/user/BreadcrumbNav";

// types
import { Post } from "../../interfaces";

const PostPage = ({ postData }: { postData: Post }) => {
  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <BreadcrumbNav pageTitle={postData.title} />
        タイトル：{postData.title}
        <br />
        slug：{postData.id}
        <br />
        公開日：{moment(postData.date).format("YYYY/MM/DD")}
        <br />
        更新日：
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Post }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

import { useState, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import CreateEbook from "../../components/ebook/CreateEbook";
import ListEbook from "../../components/ebook/ListEbook";

// types
import { Ebook, Format, Category, Sale } from "../../interfaces";

// util
import basicAuthCheck from "../../utils/basicAuthCheck";

const AdminEbookPage = ({
  allEbooks,
  allFormats,
  allCategories,
  allSales,
}: {
  allEbooks: Ebook[];
  allFormats: Format[];
  allCategories: Category[];
  allSales: Sale[];
}) => {
  // get all created ebooks
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  useEffect(() => {
    setEbooks(allEbooks);
  }, [allEbooks]);

  // refreshing
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath, undefined, {
      scroll: false,
    });
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [allEbooks]);

  return (
    <Layout>
      <Head>
        <title>Admin Ebooks</title>
      </Head>
      <article>
        <CreateEbook ebooks={ebooks} refreshData={refreshData} />
        <ListEbook
          ebooks={ebooks}
          formats={allFormats}
          categories={allCategories}
          sales={allSales}
          refreshData={refreshData}
          isRefreshing={isRefreshing}
        />
      </article>
    </Layout>
  );
};

export default AdminEbookPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ebookData = await prisma.ebook.findMany({
    include: {
      format: true,
      category: true,
      sales: { include: { sale: true } },
    },
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
    take: 100,
  });
  const allEbooks = JSON.parse(JSON.stringify(ebookData));

  const formatData = await prisma.format.findMany({
    orderBy: { id: "asc" },
  });
  const allFormats = JSON.parse(JSON.stringify(formatData));

  const categoryData = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  const allCategories = JSON.parse(JSON.stringify(categoryData));

  const saleData = await prisma.sale.findMany({
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
  });
  const allSales = JSON.parse(JSON.stringify(saleData));

  const { req, res } = ctx;
  await basicAuthCheck(req, res);

  return { props: { allEbooks, allFormats, allCategories, allSales } };
};

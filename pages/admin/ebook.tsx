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
      <article className="pt-10">
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
  const formatData = await prisma.format.findMany({
    orderBy: { id: "asc" },
  });
  const allFormats = JSON.parse(JSON.stringify(formatData));

  const categoryData = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  const allCategories = JSON.parse(JSON.stringify(categoryData));

  const saleData = await prisma.sale.findMany({
    where: { isPublished: true },
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
  });
  const allSales = JSON.parse(JSON.stringify(saleData));

  const { query } = ctx;

  let sales = {};
  if (query.saleId) {
    sales = {
      some: {
        saleId: Number(query.saleId),
      },
    };
  }

  let formatId = {};
  if (query.formatId) {
    formatId = { in: Number(query.formatId) };
  }

  let categoryId = {};
  if (query.categoryId) {
    categoryId = { in: Number(query.categoryId) };
  }

  let keyword = "";
  if (query.keyword) {
    keyword = String(query.keyword);
  }

  let isRecommended = {};
  if (query.isRecommended) {
    isRecommended = true;
  }

  let isDeleted = {};
  if (query.isDeleted) {
    isDeleted = true;
  }

  let isPickup = {};
  if (query.isPickup) {
    isPickup = true;
  }

  const ebookData = await prisma.ebook.findMany({
    where: {
      sales,
      formatId,
      categoryId,
      isRecommended,
      isDeleted,
      isPickup,
      OR: [
        { title: { contains: keyword } },
        { authors: { contains: keyword } },
      ],
    },
    include: {
      format: true,
      category: true,
      sales: {
        include: { sale: true },
      },
    },
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
    take: 100,
  });
  const allEbooks = JSON.parse(JSON.stringify(ebookData));

  const { req, res } = ctx;
  await basicAuthCheck(req, res);

  return { props: { allEbooks, allFormats, allCategories, allSales } };
};

import { useState, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import moment from "moment";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import CreateEbook from "../../components/ebook/CreateEbook";
import ListEbook from "../../components/ebook/ListEbook";

// types
import { Ebook, Format, Category, Label, Sale, Tag } from "../../interfaces";

// util
import basicAuthCheck from "../../utils/basicAuthCheck";

const AdminEbookPage = ({
  allEbooks,
  allFormats,
  allCategories,
  allLabels,
  allSales,
  allTags,
}: {
  allEbooks: Ebook[];
  allFormats: Format[];
  allCategories: Category[];
  allLabels: Label[];
  allSales: Sale[];
  allTags: Tag[];
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

  const [labels, setLabels] = useState<Label[]>([]);
  useEffect(() => {
    const orderdLabels = allLabels.sort((a: Label, b: Label) =>
      a.name.localeCompare(b.name)
    );
    setLabels(orderdLabels);
  }, [allLabels]);

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
          labels={labels}
          sales={allSales}
          tags={allTags}
          refreshData={refreshData}
          isRefreshing={isRefreshing}
        />
      </article>
    </Layout>
  );
};

export default AdminEbookPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tagData = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });
  const allTags = JSON.parse(JSON.stringify(tagData));

  const formatData = await prisma.format.findMany({
    orderBy: { id: "asc" },
  });
  const allFormats = JSON.parse(JSON.stringify(formatData));

  const categoryData = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  const allCategories = JSON.parse(JSON.stringify(categoryData));

  const labelData = await prisma.label.findMany({
    orderBy: { id: "asc" },
  });
  const allLabels = JSON.parse(JSON.stringify(labelData));

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

  let readAt = {};
  if (query.readAt) {
    const start = query.readAt + "-01";
    const end =
      query.readAt + "-" + moment(query.readAt, "YYYY-MM").daysInMonth();
    readAt = {
      gte: moment(start).format(),
      lt: moment(end).format(),
    };
  }

  let tags = {};
  if (query.tagId) {
    tags = {
      some: {
        tagId: Number(query.tagId),
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

  let labelId = {};
  if (query.labelId) {
    labelId = { in: Number(query.labelId) };
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
      tags,
      formatId,
      categoryId,
      labelId,
      isRecommended,
      isDeleted,
      isPickup,
      readAt,
      OR: [
        { title: { contains: keyword } },
        { authors: { contains: keyword } },
      ],
    },
    include: {
      format: true,
      category: true,
      label: true,
      sales: {
        include: { sale: true },
      },
      tags: {
        include: { tag: true },
      },
    },
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
    take: 100,
  });
  const allEbooks = JSON.parse(JSON.stringify(ebookData));

  const { req, res } = ctx;
  await basicAuthCheck(req, res);

  return {
    props: {
      allEbooks,
      allFormats,
      allCategories,
      allLabels,
      allSales,
      allTags,
    },
  };
};

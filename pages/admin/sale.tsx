import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// db
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import CreateSale from "../../components/sale/CreateSale";
import ListSale from "../../components/sale/ListSale";

// types
import { Ebook, Sale } from "../../interfaces";

// util
import basicAuthCheck from "../../utils/basicAuthCheck";

const AdminSalePage = ({
  allEbooks,
  allSales,
}: {
  allEbooks: Ebook[];
  allSales: Sale[];
}) => {
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
  }, [allSales]);

  return (
    <Layout>
      <Head>
        <title>Admin Sales</title>
      </Head>
      <article className="pt-10">
        <CreateSale ebooks={allEbooks} refreshData={refreshData} />
        <ListSale
          sales={allSales}
          ebooks={allEbooks}
          refreshData={refreshData}
          isRefreshing={isRefreshing}
        />
      </article>
    </Layout>
  );
};

export default AdminSalePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ebookData = await prisma.ebook.findMany({
    include: {
      format: true,
      category: true,
      sales: { include: { sale: true } },
    },
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
  });
  const allEbooks = JSON.parse(JSON.stringify(ebookData));

  const saleData = await prisma.sale.findMany({
    include: { ebooks: { include: { ebook: true } } },
    orderBy: [{ isDeleted: "asc" }, { id: "desc" }],
  });
  const allSales = JSON.parse(JSON.stringify(saleData));

  const { req, res } = ctx;
  await basicAuthCheck(req, res);

  return { props: { allEbooks, allSales } };
};

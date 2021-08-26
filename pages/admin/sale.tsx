import { useState, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

// components
import Layout from "../../components/layout";
import CreateSale from "../../components/sale/CreateSale";
import ListSale from "../../components/sale/ListSale";

// types
import { Ebook, Sale } from "../../interfaces";

// util
import basicAuthCheck from "../../util/basicAuthCheck";

const AdminSalePage = ({
  allEbooks,
  allSales,
}: {
  allEbooks: Ebook[];
  allSales: Sale[];
}) => {
  return (
    <Layout>
      <Head>
        <title>Admin Sales</title>
      </Head>
      <article>
        <CreateSale ebooks={allEbooks} />
        <ListSale sales={allSales} />
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

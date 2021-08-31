import prisma from "../../../../lib/prisma";

// POST /api/ebookOnSale/delete/:id
export default async function handle(
  req: {
    body: number;
    query: {
      id: number;
    };
  },
  res: any
) {
  const saleId = req.query.id;

  const deleteEbookOnSale = await prisma.sale.update({
    where: {
      id: Number(saleId),
    },
    data: {
      ebooks: {
        deleteMany: { ebookId: Number(req.body) },
      },
    },
  });
  res.json(deleteEbookOnSale);
}

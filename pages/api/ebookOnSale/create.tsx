import prisma from "../../../lib/prisma";

// POST /api/ebookOnSale/create
export default async function handle(
  req: {
    body: {
      ebookId: number;
      saleId: number;
    };
  },
  res: any
) {
  const { ebookId, saleId } = req.body;

  const newEbookOnSale = await prisma.ebookOnSale.create({
    data: {
      ebookId,
      saleId,
    },
  });
  res.json(newEbookOnSale);
}

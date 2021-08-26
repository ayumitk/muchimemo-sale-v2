import prisma from "../../../../lib/prisma";

// PUT /api/sale/update/:id
export default async function handle(
  req: {
    body: {
      title: string;
      saleEnds: string;
      isDeleted: boolean;
      isPublished: boolean;
    };
    query: {
      id: number;
    };
  },
  res: any
) {
  const saleId = req.query.id;
  const { title, saleEnds, isDeleted, isPublished } = req.body;

  const updateSale = await prisma.sale.update({
    where: { id: Number(saleId) },
    data: {
      title,
      saleEnds,
      isDeleted,
      isPublished,
    },
  });
  res.json(updateSale);
}

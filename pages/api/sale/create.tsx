import prisma from "../../../lib/prisma";

// POST /api/ebook/create
export default async function handle(
  req: {
    body: {
      title: string;
      saleEnds: string;
    };
  },
  res: any
) {
  const { title, saleEnds } = req.body;

  const newSale = await prisma.sale.create({
    data: {
      title,
      saleEnds,
    },
  });
  res.json(newSale);
}

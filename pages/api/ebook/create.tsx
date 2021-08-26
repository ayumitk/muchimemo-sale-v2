import prisma from "../../../lib/prisma";

// POST /api/ebook
export default async function handle(
  req: {
    body: {
      title: string;
      imageUrl?: string;
      authors?: string;
      publisher?: string;
      amazonId: string;
      price?: number;
      points?: number;
      formatId: number;
      categoryId: number;
    };
  },
  res: any
) {
  const {
    title,
    imageUrl,
    authors,
    publisher,
    amazonId,
    price,
    points,
    formatId,
    categoryId,
  } = req.body;

  const newEbook = await prisma.ebook.create({
    data: {
      title,
      imageUrl,
      authors,
      publisher,
      amazonId,
      price,
      points,
      formatId,
      categoryId,
    },
  });
  res.json(newEbook);
}

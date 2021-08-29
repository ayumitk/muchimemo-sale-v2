import prisma from "../../../../lib/prisma";

// PUT /api/ebook/update/:id
export default async function handle(
  req: {
    body: {
      comment?: string;
      formatId: number;
      categoryId: number;
      rentaId?: string;
      cmoaId?: string;
      dmmId?: string;
      isDeleted: boolean;
      price?: number;
      points?: number;
      isRecommended: boolean;
      reviewCount: number;
      reviewAverage: string;
    };
    query: {
      id: number;
    };
  },
  res: any
) {
  const ebookId = req.query.id;
  const {
    comment,
    formatId,
    categoryId,
    rentaId,
    cmoaId,
    dmmId,
    isDeleted,
    price,
    points,
    isRecommended,
    reviewCount,
    reviewAverage,
  } = req.body;

  const updateEbook = await prisma.ebook.update({
    where: { id: Number(ebookId) },
    data: {
      comment,
      formatId,
      categoryId,
      rentaId,
      cmoaId,
      dmmId,
      isDeleted,
      price,
      points,
      isRecommended,
      reviewCount,
      reviewAverage,
    },
  });
  res.json(updateEbook);
}

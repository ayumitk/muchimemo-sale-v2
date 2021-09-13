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
      isPickup: boolean;
      isRecommended: boolean;
      reviewCount: number;
      reviewAverage: string;
      imageWidth?: number;
      imageHeight?: number;
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
    isPickup,
    isRecommended,
    reviewCount,
    reviewAverage,
    imageWidth,
    imageHeight,
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
      isPickup,
      isRecommended,
      reviewCount,
      reviewAverage,
      imageWidth,
      imageHeight,
    },
  });
  res.json(updateEbook);
}

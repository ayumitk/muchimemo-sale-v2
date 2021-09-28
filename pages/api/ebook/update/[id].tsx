import prisma from "../../../../lib/prisma";

// PUT /api/ebook/update/:id
export default async function handle(
  req: {
    body: {
      title: string;
      description?: string;
      comment?: string;
      formatId: number;
      categoryId: number;
      labelId: number;
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
      readAt?: string;
    };
    query: {
      id: number;
    };
  },
  res: any
) {
  const ebookId = req.query.id;
  const {
    title,
    description,
    comment,
    formatId,
    categoryId,
    labelId,
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
    readAt,
  } = req.body;

  const updateEbook = await prisma.ebook.update({
    where: { id: Number(ebookId) },
    data: {
      title,
      description,
      comment,
      formatId,
      categoryId,
      labelId,
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
      readAt,
    },
  });
  res.json(updateEbook);
}

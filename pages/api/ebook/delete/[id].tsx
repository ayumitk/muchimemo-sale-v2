import prisma from "../../../../lib/prisma";

// PUT /api/ebook/delete/:id
export default async function handle(
  req: {
    body: {
      isDeleted: boolean;
    };
    query: {
      id: number;
    };
  },
  res: any
) {
  const ebookId = req.query.id;
  const { isDeleted } = req.body;

  const deleteEbook = await prisma.ebook.update({
    where: { id: Number(ebookId) },
    data: {
      isDeleted,
      sales: {
        deleteMany: {},
      },
    },
  });
  res.json(deleteEbook);
}

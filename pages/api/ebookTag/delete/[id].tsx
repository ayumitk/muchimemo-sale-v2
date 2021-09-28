import prisma from "../../../../lib/prisma";

// POST /api/ebookTag/delete/:id
export default async function handle(
  req: {
    body: number;
    query: {
      id: number;
    };
  },
  res: any
) {
  const tagId = req.query.id;

  const deleteEbookTag = await prisma.tag.update({
    where: {
      id: Number(tagId),
    },
    data: {
      ebooks: {
        deleteMany: { ebookId: Number(req.body) },
      },
    },
  });
  res.json(deleteEbookTag);
}

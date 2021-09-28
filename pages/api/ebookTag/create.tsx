import prisma from "../../../lib/prisma";

// POST /api/ebookTag/create
export default async function handle(
  req: {
    body: {
      ebookId: number;
      tagId: number;
    };
  },
  res: any
) {
  const { ebookId, tagId } = req.body;

  const createEbookTag = await prisma.ebookTag.create({
    data: {
      ebookId: ebookId,
      tagId: tagId,
    },
  });
  res.json(createEbookTag);
}

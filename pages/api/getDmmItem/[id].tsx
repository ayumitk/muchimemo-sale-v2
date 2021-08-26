import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  const dmm = require("dmm.js");
  const client = new dmm.Client({
    api_id: process.env.DMM_API_ID,
    affiliate_id: process.env.DMM_AFFILIATE_ID,
  });

  client.product(
    {
      site: "DMM.com",
      service: "ebook",
      cid: id,
      hits: 1,
      output: "json",
    },
    function (
      err: any,
      data: {
        result: {
          items: string[];
        };
      }
    ) {
      res.json({ item: data.result.items[0] });
    }
  );
};

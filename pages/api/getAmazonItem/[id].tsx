import { NextApiRequest, NextApiResponse } from "next";
// import {amazonPaapi} from 'amazon-paapi'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  // Amazon Product Advertising API v5.0
  const amazonPaapi = require("amazon-paapi");

  const commonParameters = {
    AccessKey: `${process.env.AMAZON_PAAPI_ACCESS_KEY}`,
    SecretKey: `${process.env.AMAZON_PAAPI_SECRET_KEY}`,
    PartnerTag: "ayutak04-22", // Your tag
    PartnerType: "Associates", // Default value is Associates.
    Marketplace: "www.amazon.co.jp", // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
  };

  const requestParameters = {
    ItemIds: [id],
    ItemIdType: "ASIN",
    Resources: [
      "BrowseNodeInfo.BrowseNodes",
      "Images.Primary.Large",
      "ItemInfo.Title",
      "ItemInfo.ByLineInfo",
      "Offers.Listings.Price",
      "Offers.Listings.LoyaltyPoints.Points",
    ],
  };

  amazonPaapi
    .GetItems(commonParameters, requestParameters)
    .then(
      (data: {
        ItemsResult: {
          Items: string[];
        };
      }) => {
        res.status(200).json({ item: data.ItemsResult.Items });
      }
    )
    .catch((error: { status: number }) => {
      if (error.status === 429) {
        res.json({ error: error });
      }
    });
};

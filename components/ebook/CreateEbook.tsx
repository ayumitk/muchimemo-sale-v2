import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import retryx from "retryx";

// types
import { Ebook } from "../../interfaces";

const CreateEbook = (props: { ebooks: Ebook[]; refreshData: any }) => {
  const { ebooks, refreshData } = props;

  // get all created ebook asins array
  const [ebookAsins, setEbookAsins] = useState<string[]>([]);
  useEffect(() => {
    const getAllCreatedEbookAsins = () => {
      const asins = ebooks.map((ebook) => ebook.amazonId);
      setEbookAsins(asins);
    };
    getAllCreatedEbookAsins();
  }, [ebooks]);

  // input asin list
  const [asin, setAsin] = useState<string[]>([]);
  const handleChange = (e: {
    target: {
      value: string;
    };
  }) => {
    setAsin(e.target.value.split("\n"));
  };

  const [newEbooks, setNewEbooks] = useState<string[]>([]);
  const [processing, setProcessing] = useState<string[]>([]);

  // get amazon data from asin
  const getAmazonData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newAsins = asin.filter((asin) => ebookAsins.indexOf(asin) === -1);
    setProcessing(newAsins);
    setNewEbooks([]);

    // access amazon api
    newAsins.forEach((asin) => {
      retryx(
        () =>
          axios.get(`/api/getAmazonItem/${asin}`).then((res) => {
            if (res.data.error) {
              if (res.data.error.status === 429) {
                return Promise.reject();
              }
            }
            return Promise.resolve(res.data.item[0]);
          }),
        {
          maxTries: 1000,
          beforeWait: (tries) => {
            console.log(tries);
          },
        }
      ).then(async (res) => {
        setNewEbooks((prevState) => [...prevState, res]);

        // define format
        const manga = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) =>
            browseNode.Id === "2293143051" ||
            browseNode.Id === "2293147051" ||
            browseNode.Id === "2430869051" ||
            browseNode.Id === "2430737051" ||
            browseNode.Id === "2430765051" ||
            browseNode.Id === "2430812051"
        );
        const novel = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) =>
            browseNode.Id === "12075891" ||
            browseNode.Id === "2293148051" ||
            browseNode.Id === "2189052051" ||
            browseNode.Id === "2292764051" ||
            browseNode.Id === "2410280051"
        );

        let formatId = 1; // ?????????
        if (manga) {
          formatId = 2; // ?????????
        } else if (novel) {
          formatId = 3; // ??????
        }

        // define category
        const bl = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) =>
            browseNode.Id === "12075891" ||
            browseNode.Id === "2293148051" ||
            browseNode.Id === "2293147051"
        );
        const men = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) => browseNode.Id === "2430869051"
        );
        const women = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) => browseNode.Id === "2430737051"
        );
        const girls = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) => browseNode.Id === "2430765051"
        );
        const boys = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) => browseNode.Id === "2430812051"
        );
        const general = res.BrowseNodeInfo.BrowseNodes.some(
          (browseNode: { Id: string }) => browseNode.Id === "2292764051"
        );

        let categoryId = 1; // ?????????
        if (bl) {
          categoryId = 2; // BL
        } else if (girls) {
          categoryId = 3; // ??????
        } else if (women) {
          categoryId = 4; // ??????
        } else if (boys) {
          categoryId = 5; // ??????
        } else if (men) {
          categoryId = 6; // ??????
        } else if (general) {
          categoryId = 7; // ??????
        }

        const body = {
          title: res.ItemInfo.Title.DisplayValue,
          imageUrl: res.Images.Primary.Large.URL,
          imageWidth: res.Images.Primary.Large.Width,
          imageHeight: res.Images.Primary.Large.Height,
          authors: JSON.stringify(res.ItemInfo.ByLineInfo.Contributors),
          publisher: res.ItemInfo.ByLineInfo.Manufacturer
            ? res.ItemInfo.ByLineInfo.Manufacturer.DisplayValue
            : "",
          amazonId: res.ASIN,
          price: res.Offers.Listings[0].Price.Amount,
          points: res.Offers.Listings[0].LoyaltyPoints
            ? res.Offers.Listings[0].LoyaltyPoints.Points
            : 0,
          formatId: formatId,
          categoryId: categoryId,
          readAt: null,
        };

        // create a ebook
        try {
          await fetch("/api/ebook/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.error(error);
        } finally {
          refreshData();
        }
      });
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">???????????????????????????</h2>
        <Link href="/admin/sale">
          <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            ?????????????????????
          </a>
        </Link>
      </div>
      <form onSubmit={getAmazonData}>
        <textarea
          rows={5}
          onChange={handleChange}
          placeholder="ASIN????????????????????????????????????"
          className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
        ></textarea>
        <div className="text-center mt-5 mb-3">
          <button
            disabled={asin.length === 0 || asin[0] === ""}
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
          >
            Amazon????????????????????????
          </button>
        </div>
      </form>
      <div className="text-center text-sm">{`???????????? ${asin.length} ?????????${
        newEbooks && newEbooks.length
      } / ${processing.length} ?????????`}</div>
    </div>
  );
};

export default CreateEbook;

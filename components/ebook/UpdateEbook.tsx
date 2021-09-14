import { useState } from "react";
import axios from "axios";
import retryx from "retryx";
import moment from "moment";
import { CheckIcon } from "@heroicons/react/solid";

// types
import { Ebook } from "../../interfaces";

const UpdateEbook = (props: { ebook: Ebook; refreshData: any }) => {
  const { ebook, refreshData } = props;

  const [updateDone, setUpdateDone] = useState<boolean>(false);

  const updateEbook = async (id: number, amazonId: string) => {
    retryx(
      () =>
        axios.get(`/api/getAmazonItem/${amazonId}`).then((res) => {
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
      try {
        const body = {
          ...ebook,
          title: res.ItemInfo.Title.DisplayValue,
          imageUrl: res.Images.Primary.Large.URL,
          imageWidth: res.Images.Primary.Large.Width,
          imageHeight: res.Images.Primary.Large.Height,
          authors: JSON.stringify(res.ItemInfo.ByLineInfo.Contributors),
          publisher: res.ItemInfo.ByLineInfo.Manufacturer.DisplayValue,
          price: res.Offers.Listings[0].Price.Amount,
          points: res.Offers.Listings[0].LoyaltyPoints
            ? res.Offers.Listings[0].LoyaltyPoints.Points
            : 0,
        };
        await fetch(`/api/ebook/update/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setUpdateDone(true);
        refreshData();
      }
    });
  };

  return (
    <>
      <button
        className="text-blue-600 hover:text-blue-700 hover:underline"
        onClick={() => updateEbook(ebook.id, ebook.amazonId)}
      >
        更新
      </button>
      {updateDone && <CheckIcon className="w-4 text-teal-500 inline-block" />}
      <p className="text-xs text-gray-500">
        {moment(ebook.updatedAt).format("YYYY/MM/DD hh:mm:ss")}
      </p>
    </>
  );
};

export default UpdateEbook;

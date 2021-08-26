import { useState } from "react";
import axios from "axios";
import retryx from "retryx";
import moment from "moment";
import { CheckIcon } from "@heroicons/react/solid";

// types
import { Ebook } from "../../interfaces";

const UpdateEbook = (props: { ebook: Ebook }) => {
  const { ebook } = props;

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
          authors: JSON.stringify(res.ItemInfo.ByLineInfo.Contributors),
          publisher: res.ItemInfo.ByLineInfo.Manufacturer.DisplayValue,
          price: res.Offers.Listings[0].Price.Amount,
          points: res.Offers.Listings[0].LoyaltyPoints.Points,
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
      }
    });
  };

  return (
    <>
      <button
        className="font-medium text-blue-600"
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

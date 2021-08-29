import { useState } from "react";
import axios from "axios";
import retryx from "retryx";
import moment from "moment";
import { CheckIcon } from "@heroicons/react/solid";

// types
import { Ebook } from "../../interfaces";

const DmmUpdateEbook = (props: { ebook: Ebook; refreshData: any }) => {
  const { ebook, refreshData } = props;

  const [updateDone, setUpdateDone] = useState<boolean>(false);

  const updateReview = async (id: number, dmmId: string) => {
    try {
      const response = await fetch(`/api/getDmmItem/${dmmId}`);
      const jsonData = await response.json();

      const body = {
        ...ebook,
        reviewCount: jsonData.item.review ? jsonData.item.review.count : 0,
        reviewAverage: jsonData.item.review
          ? jsonData.item.review.average
          : "0",
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
  };

  return (
    <>
      <button
        className="font-medium text-blue-600"
        onClick={() => {
          if (
            ebook.dmmId !== null &&
            ebook.dmmId !== "" &&
            ebook.dmmId !== undefined
          ) {
            updateReview(ebook.id, ebook.dmmId);
          }
        }}
      >
        更新
      </button>
      {updateDone && <CheckIcon className="w-4 text-teal-500 inline-block" />}
    </>
  );
};

export default DmmUpdateEbook;

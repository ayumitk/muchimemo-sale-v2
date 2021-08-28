import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

// types
import { Ebook } from "../../interfaces";

// components
import ConfirmSale from "./ConfirmSale";

const CreateSale = (props: { ebooks: Ebook[]; refreshData: any }) => {
  const { ebooks, refreshData } = props;

  const [open, setOpen] = useState<boolean>(false);

  const [newSale, setNewSale] = useState({ title: "", saleEnds: "" });
  const [newSaleAsin, setNewSaleAsin] = useState([""]);

  const handleChangeTextarea = (e: { target: { value: string } }) => {
    if (e.target.value === "") {
      setNewSaleAsin([]);
    } else {
      setNewSaleAsin(e.target.value.split("\n"));
    }
  };

  const [newSaleEbook, setNewSaleEbook] = useState<Ebook[]>([]);
  const [uncreatedAsin, setUncreatedAsin] = useState<string[]>([]);

  const confirmSaleModal = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = ebooks.filter((x) => newSaleAsin.includes(x.amazonId));
    let resultAsin: string[] = [];
    result.forEach((item) => {
      resultAsin.push(item.amazonId);
    });

    let arr = newSaleAsin.concat(resultAsin);
    const uncreatedAsin = arr.filter((v) => {
      return !(newSaleAsin.indexOf(v) !== -1 && resultAsin.indexOf(v) !== -1);
    });

    if (newSaleAsin.length === result.length) {
      setNewSaleEbook(result);
      setOpen(true);
      setUncreatedAsin([]);
    } else {
      setUncreatedAsin(uncreatedAsin);
    }
  };

  // update state from confirm
  const deleteSaleEbook = (newSaleEbook: Ebook[], newSaleAsin: string[]) => {
    setNewSaleEbook(newSaleEbook);
    setNewSaleAsin(newSaleAsin);
  };

  return (
    <>
      <Fragment>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">セールを登録する</h2>
          <Link href="/admin/ebook">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              電子書籍の登録へ
            </a>
          </Link>
        </div>
        <form className="mb-14">
          <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="sale-title"
              className="block font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              セールタイトル
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-3">
              <input
                id="sale-title"
                type="text"
                value={newSale.title}
                onChange={(e) =>
                  setNewSale({ ...newSale, title: e.target.value })
                }
                placeholder="セールタイトル"
                required
                className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="sale-ends"
              className="block font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              セール終了日
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-3">
              <input
                id="sale-ends"
                type="date"
                value={newSale.saleEnds}
                onChange={(e) =>
                  setNewSale({ ...newSale, saleEnds: e.target.value })
                }
                required
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="sale-list"
              className="block font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              セール対象本ASINリスト
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-3">
              <textarea
                id="sale-list"
                rows={5}
                required
                onChange={(e) => handleChangeTextarea(e)}
                placeholder="ASINリストを改行区切りで入力"
                className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
              ></textarea>
              {uncreatedAsin.map((asin) => (
                <div
                  key={asin}
                  className="mt-2 text-red-500 font-medium text-sm"
                >
                  <ExclamationCircleIcon className="w-4 inline-block mr-1" />
                  {asin}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center sm:pt-5">
            <button
              onClick={(e) => confirmSaleModal(e)}
              disabled={
                !newSale.title ||
                !newSale.saleEnds ||
                newSaleAsin.length === 0 ||
                newSaleAsin[0] === ""
              }
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              確認する
            </button>
          </div>
        </form>
      </Fragment>
      <ConfirmSale
        open={open}
        setOpen={setOpen}
        newSale={newSale}
        newSaleAsin={newSaleAsin}
        newSaleEbook={newSaleEbook}
        onChangeNewSaleEbook={deleteSaleEbook}
        refreshData={refreshData}
      />
    </>
  );
};

export default CreateSale;

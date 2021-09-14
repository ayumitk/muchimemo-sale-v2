import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import "moment-timezone";
import Image from "next/image";

// types
import { Ebook } from "../../interfaces";

const ConfirmSale = (props: {
  open: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  newSale: {
    title: string;
    saleEnds: string;
  };
  newSaleAsin: string[];
  newSaleEbook: Ebook[];
  onChangeNewSaleEbook: (arg0: Ebook[], arg1: string[]) => void;
  refreshData: any;
}) => {
  const { open, setOpen, newSale, newSaleAsin, newSaleEbook, refreshData } =
    props;
  const cancelButtonRef = useRef(null);

  const createSale = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const saleBody = {
        title: newSale.title,
        saleEnds: moment(newSale.saleEnds).toISOString(),
      };

      const response = await fetch("/api/sale/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleBody),
      });
      const post = await response.json();

      await newSaleEbook.forEach((ebook) => {
        const ebookBody = { ebookId: ebook.id, saleId: post.id };
        fetch("/api/ebookOnSale/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ebookBody),
        });
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setOpen(false);
      refreshData();
    }
  };

  const deleteSaleEbook = (e: React.SyntheticEvent, ebookId: number) => {
    e.preventDefault();
    const remainEbooks = newSaleEbook.filter((v) => v.id !== ebookId);

    const deletedEbook = newSaleEbook.find((v) => v.id === ebookId);
    const deletedEbookAsin = deletedEbook && deletedEbook.amazonId;

    const remainEbookAsinArr = newSaleAsin.filter(
      (v: string) => v !== deletedEbookAsin
    );
    props.onChangeNewSaleEbook(remainEbooks, remainEbookAsinArr);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto font-noto-sans"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                <div>
                  <div className="mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl leading-6 font-bold text-center"
                    >
                      下記の内容で登録しますか？
                    </Dialog.Title>
                    <form>
                      <div className="mt-10">
                        <h2 className="text-2xl font-bold">{newSale.title}</h2>
                        <p className="mt-2">セール終了日：{newSale.saleEnds}</p>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="pl-4 pr-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  image
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  title
                                </th>
                                <th
                                  scope="col"
                                  className="pl-2 pr-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  delete
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {newSaleEbook.map((ebook) => (
                                <tr key={ebook.id}>
                                  <td className="pl-4 pr-2 py-1 text-sm">
                                    <div
                                      className={`w-10 ${
                                        ebook.isDeleted && "opacity-50"
                                      }`}
                                      style={{ lineHeight: 0 }}
                                    >
                                      <Image
                                        src={
                                          ebook.imageUrl
                                            ? ebook.imageUrl
                                            : "/images/placeholder.svg"
                                        }
                                        alt={`${ebook.title}の表紙`}
                                        width={
                                          ebook.imageWidth
                                            ? ebook.imageWidth
                                            : 343
                                        }
                                        height={
                                          ebook.imageHeight
                                            ? ebook.imageHeight
                                            : 500
                                        }
                                        placeholder="blur"
                                        blurDataURL="/images/placeholder.svg"
                                      />
                                    </div>
                                  </td>
                                  <td className="px-2 py-2 text-sm">
                                    {ebook.title}
                                  </td>
                                  <td className="pl-2 pr-4 py-2 text-sm text-center">
                                    <button
                                      className="text-red-500"
                                      onClick={(e) =>
                                        deleteSaleEbook(e, ebook.id)
                                      }
                                    >
                                      削除
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-10 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={createSale}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm"
                  >
                    セールを登録する
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ConfirmSale;

import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";

// types
import { Ebook, Sale } from "../../interfaces";

const EditEbooksOnSale = (props: {
  sale: Sale;
  ebooks: Ebook[];
  refreshData: any;
}) => {
  const { sale, ebooks, refreshData } = props;

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [saleDetails, setSaleDetails] = useState(sale);

  useEffect(() => {
    setSaleDetails(sale);
  }, [sale]);

  const editModalOpen = () => {
    setOpen(true);
  };

  const [additionalSaleEbooks, setAdditionalSaleEbooks] = useState<string[]>(
    []
  );
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === "") {
      setAdditionalSaleEbooks([]);
    } else {
      setAdditionalSaleEbooks(e.target.value.split("\n"));
    }
  };

  const [uncreatedAsin, setUncreatedAsin] = useState<string[]>([]);

  const addSaleEbooks = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let uncreatedResult: string[] = [];
    if (additionalSaleEbooks.length > 0) {
      setUncreatedAsin([]);
      uncreatedResult = [];
      additionalSaleEbooks.forEach((asin) => {
        if (!ebooks.some((ebook) => ebook.amazonId === asin)) {
          uncreatedResult.push(asin);
          setUncreatedAsin(uncreatedResult);
        }
      });

      // create ebook - sale relation row
      try {
        // sale ebooks array -> asin array
        let saleEbooksAsin: string[] = [];
        saleDetails.ebooks.forEach((item) => {
          saleEbooksAsin.push(item.ebook.amazonId);
        });

        // remove duplicated asin
        const uniqueAdditionalAsin = additionalSaleEbooks.filter(
          (asin) => !saleEbooksAsin.includes(asin)
        );

        // asin array -> ebook_id array
        const ebookIdArr = ebooks.filter((ebook) => {
          if (!ebook.isDeleted) {
            return uniqueAdditionalAsin.includes(ebook.amazonId);
          }
        });

        // create ebook-sale relation row
        await ebookIdArr.forEach((ebook) => {
          const body = { ebookId: ebook.id, saleId: saleDetails.id };
          fetch("/api/ebookOnSale/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        });
      } catch (err: any) {
        console.error(err.message);
      } finally {
        refreshData();
      }
    }
  };

  const deleteSaleEbook = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ebookId: number,
    saleId: number
  ) => {
    e.preventDefault();
    if (saleDetails.ebooks.length > 1) {
      try {
        const body = ebookId;
        await fetch(`/api/ebookOnSale/delete/${saleId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } catch (err: any) {
        console.error(err.message);
      } finally {
        refreshData();
      }
    } else {
      alert("これ以上削除できません");
    }
  };

  return (
    <>
      <button
        className="text-teal-500 hover:text-teal-600 hover:underline"
        onClick={() => editModalOpen()}
      >
        {sale.ebooks.length}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
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
                      className="text-2xl leading-6 font-medium text-center"
                    >
                      セール対象作品を編集
                    </Dialog.Title>
                    <div className="mt-5">
                      <form>
                        <div className="mb-5">
                          <label
                            htmlFor="additionalSaleEbooks"
                            className="block text-sm font-medium text-gray-700"
                          >
                            対象作品を追加
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="additionalSaleEbooks"
                              rows={3}
                              onChange={(e) => handleChangeTextarea(e)}
                              className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3 mb-2"
                            ></textarea>
                            {uncreatedAsin.map((asin) => (
                              <div
                                key={asin}
                                className="text-red-500 text-sm font-medium"
                              >
                                <ExclamationCircleIcon className="w-4 inline-block mr-1" />
                                {`${asin} を先に登録してください`}
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-center">
                            <button
                              onClick={addSaleEbooks}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-teal-600 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              対象作品を追加
                            </button>
                          </div>
                        </div>

                        <fieldset className="mb-5">
                          <legend className="text-sm font-medium text-gray-700">
                            対象作品
                          </legend>
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-1">
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
                                {saleDetails.ebooks &&
                                  saleDetails.ebooks.length > 0 &&
                                  saleDetails.ebooks.map((item) => (
                                    <tr
                                      key={item.ebook.id}
                                      className={
                                        item.ebook.isDeleted
                                          ? "bg-gray-200"
                                          : ""
                                      }
                                    >
                                      <td className="pl-4 pr-2 py-1 text-sm font-medium">
                                        <div
                                          className="w-10"
                                          style={{ lineHeight: 0 }}
                                        >
                                          <Image
                                            src={
                                              item.ebook.imageUrl
                                                ? item.ebook.imageUrl
                                                : "/images/placeholder.svg"
                                            }
                                            alt={`${item.ebook.title}の表紙`}
                                            width={
                                              item.ebook.imageWidth
                                                ? item.ebook.imageWidth
                                                : 343
                                            }
                                            height={
                                              item.ebook.imageHeight
                                                ? item.ebook.imageHeight
                                                : 500
                                            }
                                            placeholder="blur"
                                            blurDataURL="/images/placeholder.svg"
                                          />
                                        </div>
                                      </td>
                                      <td className="px-2 py-2 text-sm font-medium">
                                        {item.ebook.title}
                                      </td>
                                      <td className="pl-2 pr-4 py-2 text-sm text-center">
                                        <button
                                          className="text-red-500 font-medium"
                                          onClick={(e) => {
                                            deleteSaleEbook(
                                              e,
                                              item.ebookId,
                                              item.saleId
                                            );
                                          }}
                                        >
                                          削除
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EditEbooksOnSale;

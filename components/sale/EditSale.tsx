import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

// types
import { Sale } from "../../interfaces";

const EditSale = (props: { sale: Sale; refreshData: any }) => {
  const { sale, refreshData } = props;

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [saleDetails, setSaleDetails] = useState(sale);

  useEffect(() => {
    setSaleDetails(sale);
  }, [sale]);

  const editModalOpen = () => {
    setOpen(true);
  };

  // update a sale
  const updateSale = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const saleBody = { saleDetails };
      await fetch(`/api/sale/update/${saleDetails.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleBody.saleDetails),
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setOpen(false);
      refreshData();
    }
  };

  return (
    <>
      <button
        className="text-teal-500 hover:text-teal-600 hover:underline"
        onClick={() => editModalOpen()}
      >
        編集
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
                      className="text-2xl leading-6 font-bold text-center"
                    >
                      セール情報を編集
                    </Dialog.Title>
                    <div className="mt-5">
                      <form>
                        <div className="mb-5">
                          <label
                            htmlFor="sale-title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            セールタイトル
                          </label>
                          <div className="mt-1">
                            <input
                              id="sale-title"
                              type="text"
                              required
                              value={saleDetails.title}
                              onChange={(e) =>
                                setSaleDetails({
                                  ...saleDetails,
                                  title: e.target.value,
                                })
                              }
                              className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
                            />
                          </div>
                        </div>

                        <div className="mb-5 relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="is-recommended"
                              type="checkbox"
                              checked={saleDetails.isPublished}
                              onChange={(e) =>
                                setSaleDetails({
                                  ...saleDetails,
                                  isPublished: e.target.checked,
                                })
                              }
                              className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="is-recommended"
                              className="text-gray-700"
                            >
                              公開する
                            </label>
                          </div>
                        </div>

                        <div className="mb-5">
                          <label
                            htmlFor="image-url"
                            className="block text-sm font-medium text-gray-700"
                          >
                            セール終了日
                          </label>
                          <div className="mt-1">
                            <input
                              id="image-url"
                              type="date"
                              value={moment(saleDetails.saleEnds).format(
                                "YYYY-MM-DD"
                              )}
                              onChange={(e) =>
                                setSaleDetails({
                                  ...saleDetails,
                                  saleEnds: moment(
                                    e.target.value
                                  ).toISOString(),
                                })
                              }
                              className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
                            />
                          </div>
                        </div>

                        <div className="mb-10">
                          <label
                            htmlFor="saleDescription"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            説明
                          </label>
                          <textarea
                            id="saleDescription"
                            rows={3}
                            value={
                              saleDetails.description
                                ? saleDetails.description
                                : ""
                            }
                            onChange={(e) =>
                              setSaleDetails({
                                ...saleDetails,
                                description: e.target.value,
                              })
                            }
                            className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3 mb-2"
                            placeholder="空にすると自動で出力される"
                          ></textarea>
                        </div>

                        <div className="mb-5 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="button"
                            onClick={(e) => updateSale(e)}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm"
                          >
                            保存する
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

export default EditSale;

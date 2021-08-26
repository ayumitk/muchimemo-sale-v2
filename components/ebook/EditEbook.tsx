import { useEffect, useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// types
import { Ebook, Format, Category } from "../../interfaces";

const EditEbook = (props: {
  ebook: Ebook;
  formats: Format[];
  categories: Category[];
}) => {
  const { ebook, formats, categories } = props;

  const [ebookDetails, setEbookDetails] = useState<Ebook>();
  useEffect(() => {
    setEbookDetails(ebook);
  }, [ebook]);

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const modalOpen = () => {
    setOpen(true);
  };

  const updateEbook = async () => {
    if (ebookDetails) {
      try {
        const ebookBody = { ebookDetails };
        await fetch(`/api/ebook/update/${ebookDetails.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ebookBody.ebookDetails),
        });
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setOpen(false);
      }
    }
  };

  return (
    <>
      <button onClick={() => modalOpen()} className="text-teal-500 font-medium">
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
                      className="text-2xl leading-6 font-medium text-gray-900 text-center"
                    >
                      電子書籍の情報を編集
                    </Dialog.Title>
                    <div className="mt-5">
                      <form>
                        <div className="mb-5 flex items-start">
                          <div className="flex-1">
                            <label
                              htmlFor="book-title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              本のタイトル
                            </label>
                            <div className="mt-1 mb-3">
                              <input
                                id="book-title"
                                type="text"
                                value={ebookDetails && ebookDetails.title}
                                readOnly
                                className="shadow-sm block w-full focus:ring-0 focus:border-gray-300 border border-gray-300 rounded-md p-3 bg-gray-100"
                              />
                            </div>
                            <div className="relative flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="is-recommended"
                                  type="checkbox"
                                  checked={
                                    ebookDetails && ebookDetails.isRecommended
                                  }
                                  onChange={(e) => {
                                    ebookDetails &&
                                      setEbookDetails({
                                        ...ebookDetails,
                                        isRecommended: e.target.checked,
                                      });
                                  }}
                                  className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="is-recommended"
                                  className="font-medium text-gray-700"
                                >
                                  オススメ本
                                </label>
                              </div>
                            </div>
                          </div>
                          {ebookDetails && (
                            <div className="ml-3">
                              <img
                                src={ebookDetails.imageUrl}
                                alt={`${ebookDetails.title}の表紙`}
                                className="w-24"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>

                        <div className="mb-5 grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="format"
                              className="block text-sm font-medium text-gray-700"
                            >
                              フォーマット
                            </label>
                            <div className="mt-1">
                              <select
                                id="format"
                                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                                value={ebookDetails && ebookDetails.formatId}
                                onChange={(e) => {
                                  ebookDetails &&
                                    setEbookDetails({
                                      ...ebookDetails,
                                      formatId: Number(e.target.value),
                                    });
                                }}
                              >
                                {formats.map((format) => (
                                  <option key={format.id} value={format.id}>
                                    {format.id} {format.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="renta-id"
                              className="block text-sm font-medium text-gray-700"
                            >
                              カテゴリー
                            </label>
                            <div className="mt-1">
                              <select
                                id="location"
                                name="location"
                                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                                value={ebookDetails && ebookDetails.categoryId}
                                onChange={(e) => {
                                  ebookDetails &&
                                    setEbookDetails({
                                      ...ebookDetails,
                                      categoryId: Number(e.target.value),
                                    });
                                }}
                              >
                                {categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.id} {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mb-5">
                          <label
                            htmlFor="comment"
                            className="block text-sm font-medium text-gray-700"
                          >
                            コメント
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="comment"
                              rows={3}
                              value={
                                ebookDetails && ebookDetails.comment
                                  ? ebookDetails.comment
                                  : ""
                              }
                              onChange={(e) => {
                                ebookDetails &&
                                  setEbookDetails({
                                    ...ebookDetails,
                                    comment: e.target.value,
                                  });
                              }}
                              className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
                            ></textarea>
                          </div>
                        </div>

                        <div className="mb-5 grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="amazon-id"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Amazon ID (ASIN)
                            </label>
                            <div className="mt-1">
                              <input
                                id="amazon-id"
                                type="text"
                                readOnly
                                value={ebookDetails && ebookDetails.amazonId}
                                className="shadow-sm block w-full focus:ring-0 focus:border-gray-300 border border-gray-300 rounded-md p-3 bg-gray-100"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="renta-id"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Renta ID
                            </label>
                            <div className="mt-1">
                              <input
                                id="renta-id"
                                type="text"
                                value={
                                  ebookDetails && ebookDetails.rentaId
                                    ? ebookDetails.rentaId
                                    : ""
                                }
                                onChange={(e) => {
                                  ebookDetails &&
                                    setEbookDetails({
                                      ...ebookDetails,
                                      rentaId: e.target.value,
                                    });
                                }}
                                className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="cmoa-id"
                              className="block text-sm font-medium text-gray-700"
                            >
                              シーモア ID
                            </label>
                            <div className="mt-1">
                              <input
                                id="cmoa-id"
                                type="text"
                                value={
                                  ebookDetails && ebookDetails.cmoaId
                                    ? ebookDetails.cmoaId
                                    : ""
                                }
                                onChange={(e) => {
                                  ebookDetails &&
                                    setEbookDetails({
                                      ...ebookDetails,
                                      cmoaId: e.target.value,
                                    });
                                }}
                                className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="dmm-id"
                              className="block text-sm font-medium text-gray-700"
                            >
                              DMM ID
                            </label>
                            <div className="mt-1">
                              <input
                                id="dmm-id"
                                type="text"
                                value={
                                  ebookDetails && ebookDetails.dmmId
                                    ? ebookDetails.dmmId
                                    : ""
                                }
                                onChange={(e) => {
                                  ebookDetails &&
                                    setEbookDetails({
                                      ...ebookDetails,
                                      dmmId: e.target.value,
                                    });
                                }}
                                className="shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md p-3"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-10 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={updateEbook}
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EditEbook;

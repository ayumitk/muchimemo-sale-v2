import { useEffect, useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TagIcon } from "@heroicons/react/solid";

// types
import { Ebook, Tag } from "../../interfaces";

const EditTag = (props: { ebook: Ebook; tags: Tag[]; refreshData: any }) => {
  const { ebook, tags, refreshData } = props;

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const modalOpen = () => {
    setOpen(true);
  };

  const addEbookTag = async (tagId: number) => {
    try {
      const body = { ebookId: ebook.id, tagId: tagId };
      fetch("/api/ebookTag/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      refreshData();
    }
  };

  const deleteEbookTag = async (tagId: number) => {
    try {
      const body = ebook.id;
      await fetch(`/api/ebookTag/delete/${tagId}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      refreshData();
    }
  };

  return (
    <>
      <button
        onClick={() => modalOpen()}
        className="text-teal-500 hover:text-teal-600 hover:underline whitespace-nowrap"
      >
        タグ編集
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
                      タグを編集
                    </Dialog.Title>
                    <ul className="my-10 grid grid-cols-2 gap-2">
                      {tags &&
                        tags.map((tag) => {
                          const tagAdded = ebook.tags.some(
                            (x) => x.tagId === tag.id
                          );
                          return (
                            <li
                              className={`flex items-center border rounded-md py-3 px-3 ${
                                tagAdded
                                  ? "bg-teal-50 border-teal-500 text-teal-600"
                                  : "border-gray-300"
                              }`}
                              key={tag.id}
                            >
                              <span className="flex-1">
                                <TagIcon
                                  className={`w-5 h-5 inline-block mr-1 ${
                                    tagAdded ? "text-teal-500" : "text-gray-300"
                                  }`}
                                />
                                {tag.name}
                              </span>
                              {tagAdded ? (
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-100 text-base font-medium text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200 sm:mt-0 sm:col-start-1 sm:text-sm"
                                  onClick={() => deleteEbookTag(tag.id)}
                                >
                                  削除
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-100 text-base font-medium text-teal-700 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200 sm:mt-0 sm:col-start-1 sm:text-sm"
                                  onClick={() => addEbookTag(tag.id)}
                                >
                                  追加
                                </button>
                              )}
                            </li>
                          );
                        })}
                    </ul>
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

export default EditTag;

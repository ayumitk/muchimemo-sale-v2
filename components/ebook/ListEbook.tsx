import { useState, useEffect } from "react";
import { ChatAltIcon } from "@heroicons/react/solid";
import Image from "next/image";
import moment from "moment";
import "moment-timezone";
import { useRouter } from "next/router";

// types
import { Ebook, Format, Category, Label, Sale, Author } from "../../interfaces";

// components
import EditEbook from "./EditEbook";
import DeleteEbook from "./DeleteEbook";
import UpdateEbook from "./UpdateEbook";
import DmmUpdateEbook from "./DmmUpdateEbook";

const ListEbook = (props: {
  ebooks: Ebook[];
  formats: Format[];
  categories: Category[];
  labels: Label[];
  sales: Sale[];
  refreshData: any;
  isRefreshing: boolean;
}) => {
  const {
    ebooks,
    formats,
    categories,
    labels,
    sales,
    refreshData,
    isRefreshing,
  } = props;

  // filter search feature
  const [filters, setFilters] = useState({
    formatId: 0,
    categoryId: 0,
    labelId: 0,
    keyword: "",
    isDeleted: false,
    isRecommended: false,
    isPickup: false,
    saleId: 0,
    readAt: "",
  });

  let query = {};
  useEffect(() => {
    if (filters.readAt !== "") {
      query = Object.assign(query, {
        readAt: filters.readAt,
      });
    } else {
      query = { readAt: {}, ...query };
    }

    if (filters.saleId !== 0) {
      query = Object.assign(query, { saleId: filters.saleId });
    } else {
      query = { saleId: {}, ...query };
    }

    if (filters.formatId !== 0) {
      query = Object.assign(query, { formatId: filters.formatId });
    } else {
      query = { formatId: {}, ...query };
    }

    if (filters.categoryId !== 0) {
      query = Object.assign(query, { categoryId: filters.categoryId });
    } else {
      query = { categoryId: {}, ...query };
    }

    if (filters.labelId !== 0) {
      query = Object.assign(query, { labelId: filters.labelId });
    } else {
      query = { labelId: {}, ...query };
    }

    if (filters.keyword !== "") {
      query = Object.assign(query, { keyword: filters.keyword });
    } else {
      query = { keyword: {}, ...query };
    }

    if (filters.isDeleted) {
      query = Object.assign(query, { isDeleted: "1" });
    } else {
      query = { isDeleted: {}, ...query };
    }

    if (filters.isRecommended) {
      query = Object.assign(query, { isRecommended: "1" });
    } else {
      query = { isRecommended: {}, ...query };
    }

    if (filters.isPickup) {
      query = Object.assign(query, { isPickup: "1" });
    } else {
      query = { isPickup: {}, ...query };
    }
  }, [filters]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const getFilteredEbooks = () => {
    router.push(
      {
        pathname: "/admin/ebook",
        query: query,
      },
      undefined,
      { scroll: false }
    );
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [ebooks]);

  return (
    <>
      <h2 className="text-xl font-bold mb-3">登録済みの電子書籍一覧</h2>

      <div className="flex space-x-2 mb-2">
        <select
          className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
          value={filters.saleId}
          onChange={(e) =>
            setFilters({
              ...filters,
              saleId: Number(e.target.value),
            })
          }
        >
          <option value="0">セール</option>
          {sales.map((sale) => {
            const now = moment().tz("Asia/Tokyo").format();
            const end = moment(sale.saleEnds).add(9, "h").format();
            const diff = moment(end).diff(now);
            if (diff >= 0) {
              return (
                <option key={sale.id} value={sale.id}>
                  {sale.title}
                </option>
              );
            }
          })}
        </select>

        <select
          className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
          value={filters.formatId}
          onChange={(e) =>
            setFilters({
              ...filters,
              formatId: Number(e.target.value),
            })
          }
        >
          <option value="0">フォーマット</option>
          {formats.map((format) => (
            <option key={format.id} value={format.id}>
              {format.name}
            </option>
          ))}
        </select>

        <select
          className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
          value={filters.categoryId}
          onChange={(e) =>
            setFilters({
              ...filters,
              categoryId: Number(e.target.value),
            })
          }
        >
          <option value="0">カテゴリー</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
          value={filters.labelId}
          onChange={(e) =>
            setFilters({
              ...filters,
              labelId: Number(e.target.value),
            })
          }
        >
          <option value="0">レーベル</option>
          {labels.map((label) => (
            <option key={label.id} value={label.id}>
              {label.name}
            </option>
          ))}
        </select>

        <div className="flex">
          <input
            type="month"
            className="w-full block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-l-md"
            value={filters.readAt}
            onChange={(e) => setFilters({ ...filters, readAt: e.target.value })}
          />
          <button
            type="button"
            className="rounded-r-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm -ml-1"
            onClick={() => setFilters({ ...filters, readAt: "" })}
          >
            Clear
          </button>
        </div>

        <input
          type="text"
          placeholder="タイトル、作者名"
          className="focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2"
          value={filters.keyword}
          onChange={(e) =>
            setFilters({
              ...filters,
              keyword: e.target.value,
            })
          }
        />
      </div>

      <div className="space-x-4 flex items-start">
        <fieldset className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="deleted"
              type="checkbox"
              className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              checked={filters.isDeleted}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  isDeleted: e.target.checked,
                })
              }
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="deleted" className="text-gray-700">
              削除済み
            </label>
          </div>
        </fieldset>
        <fieldset className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="recommended"
              type="checkbox"
              className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              checked={filters.isRecommended}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  isRecommended: e.target.checked,
                })
              }
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="recommended" className="text-gray-700">
              オススメ
            </label>
          </div>
        </fieldset>
        <fieldset className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="pickup"
              type="checkbox"
              className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
              checked={filters.isPickup}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  isPickup: e.target.checked,
                })
              }
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="pickup" className="text-gray-700">
              Pickup
            </label>
          </div>
        </fieldset>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={getFilteredEbooks}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          データを再取得
        </button>
        <button
          type="button"
          onClick={refreshData}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ml-2"
        >
          リストを更新
        </button>
      </div>

      <p className="mt-5 text-sm text-gray-700">
        {ebooks.length}件 {isRefreshing && <span>Refreshing...</span>}
        {isLoading && <span>Loading...</span>}
      </p>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="pl-4 pr-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                id
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                image
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                title
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                format
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                category
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                label
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                product page
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                edit
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                delete
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                price
              </th>
              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                update
              </th>
              <th
                scope="col"
                className="pl-2 pr-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                review
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ebooks.map((ebook: Ebook) => (
              <tr
                key={ebook.id}
                className={`${
                  ebook.isDeleted ? "bg-gray-100 text-gray-400" : ""
                } ${ebook.isRecommended && "bg-yellow-50"}`}
              >
                <td className="pl-4 pr-2 py-2 text-sm">
                  {ebook.id}{" "}
                  <span className="block text-xs">{ebook.amazonId}</span>
                </td>
                <td className="px-2 py-1 text-xs text-gray-500">
                  <div
                    className={`w-10 ${ebook.isDeleted && "opacity-50"}`}
                    style={{ lineHeight: 0 }}
                  >
                    <Image
                      src={
                        ebook.imageUrl
                          ? ebook.imageUrl
                          : "/images/placeholder.svg"
                      }
                      alt={`${ebook.title}の表紙`}
                      width={ebook.imageWidth ? ebook.imageWidth : 343}
                      height={ebook.imageHeight ? ebook.imageHeight : 500}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.svg"
                    />
                  </div>
                  {ebook.imageWidth &&
                    ebook.imageHeight &&
                    `${ebook.imageWidth}x${ebook.imageHeight}`}
                </td>
                <td className="px-2 py-2 text-sm">
                  {ebook.title}
                  <br />
                  {ebook.authors &&
                    JSON.parse(ebook.authors).map(
                      (author: Author, index: number) => (
                        <span
                          key={`${index}-${author.Name}`}
                          className="mr-2 text-xs text-gray-700"
                        >{`${author.Name}(${author.Role})`}</span>
                      )
                    )}
                </td>
                <td className="px-2 py-2 text-sm">
                  {ebook.format && ebook.format.name}
                </td>
                <td className="px-2 py-2 text-sm">
                  {ebook.category && ebook.category.name}
                </td>
                <td className="px-2 py-2 text-sm">
                  {ebook.label && ebook.label.name}
                </td>
                <td className="px-2 py-2 text-sm">
                  <ChatAltIcon
                    className={`w-5 h-5 ${
                      ebook.comment ? "text-red-500" : "text-gray-300"
                    }`}
                  />
                </td>
                <td className="px-2 py-2 text-sm">
                  <a
                    href={`https://www.amazon.co.jp/dp/${ebook.amazonId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-5 ${
                      ebook.isDeleted && "opacity-50"
                    }`}
                  >
                    <Image
                      src="/images/amazon-icon.png"
                      alt="Amazonのロゴ"
                      width={50}
                      height={50}
                    />
                  </a>
                  <a
                    href={`https://renta.papy.co.jp/renta/sc/frm/item/${ebook.rentaId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-5 ${
                      ebook.rentaId
                        ? ""
                        : "pointer-events-none filter grayscale opacity-50"
                    }`}
                  >
                    <Image
                      src="/images/renta-icon.png"
                      alt="Rentaのロゴ"
                      width={50}
                      height={50}
                    />
                  </a>
                  <a
                    href={`https://www.cmoa.jp/title/${ebook.cmoaId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-5 ${
                      ebook.cmoaId
                        ? ""
                        : "pointer-events-none filter grayscale opacity-20"
                    }`}
                  >
                    <Image
                      src="/images/cmoa-icon.png"
                      alt="シーモアのロゴ"
                      width={50}
                      height={50}
                    />
                  </a>
                  <a
                    href={`https://book.dmm.com/detail/${ebook.dmmId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-5 ${
                      ebook.dmmId
                        ? ""
                        : "pointer-events-none filter grayscale opacity-20"
                    }`}
                  >
                    <Image
                      src="/images/dmm-icon.png"
                      alt="DMMのロゴ"
                      width={50}
                      height={50}
                    />
                  </a>
                </td>
                <td className="px-2 py-2 text-sm">
                  <EditEbook
                    ebook={ebook}
                    formats={formats}
                    categories={categories}
                    labels={labels}
                    refreshData={refreshData}
                  />
                </td>
                <td className="px-2 py-2 text-sm">
                  <DeleteEbook ebook={ebook} refreshData={refreshData} />
                </td>
                <td className="px-2 py-2 text-sm text-red-500">
                  {ebook.price && `¥${ebook.price}`}
                  <br />({ebook.points && `${ebook.points}pt`})
                </td>
                <td className="px-2 py-2 text-sm">
                  <UpdateEbook ebook={ebook} refreshData={refreshData} />
                </td>
                <td className="pl-2 pr-4 py-2 text-sm">
                  {ebook.reviewAverage && ebook.reviewAverage}(
                  {ebook.reviewCount && ebook.reviewCount})
                  <br />
                  <DmmUpdateEbook ebook={ebook} refreshData={refreshData} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListEbook;

import { useEffect, useState } from "react";
import { ChatAltIcon } from "@heroicons/react/solid";
import Image from "next/image";

// types
import { Ebook, Format, Category, Sale } from "../../interfaces";

// components
import EditEbook from "./EditEbook";
import DeleteEbook from "./DeleteEbook";
import UpdateEbook from "./UpdateEbook";
import DmmUpdateEbook from "./DmmUpdateEbook";

const ListEbook = (props: {
  ebooks: Ebook[];
  formats: Format[];
  categories: Category[];
  sales: Sale[];
  refreshData: any;
  isRefreshing: boolean;
}) => {
  const { ebooks, formats, categories, sales, refreshData, isRefreshing } =
    props;

  // filter feature
  const [filteredEbooks, setFilteredEbooks] = useState<Ebook[]>([]);
  useEffect(() => {
    setFilteredEbooks(ebooks);
  }, [ebooks]);

  const [filterChecked, setFilterChecked] = useState({
    format: [
      { slug: "others", checked: true, id: 1 },
      { slug: "manga", checked: true, id: 2 },
      { slug: "novel", checked: true, id: 3 },
    ],
    category: [
      { slug: "others", checked: true, id: 1 },
      { slug: "bl", checked: true, id: 2 },
      { slug: "girls", checked: true, id: 3 },
      { slug: "women", checked: true, id: 4 },
      { slug: "boys", checked: true, id: 5 },
      { slug: "men", checked: true, id: 6 },
    ],
    keyword: "",
    is_deleted: true,
    is_recommended: true,
    sale: 0,
  });

  // checked format filter
  const filterFormatValue = (slug: string) => {
    const formatResult = filterChecked.format.filter((x) => x.slug === slug);
    return formatResult[0].checked;
  };
  const filterFormatOnChange = (
    e: { target: { checked: boolean } },
    slug: string
  ) => {
    const index = filterChecked.format.findIndex((x) => x.slug === slug);
    let formatArr = filterChecked.format;
    formatArr[index].checked = e.target.checked;
    setFilterChecked({ ...filterChecked, format: formatArr });
  };

  // checked category filter
  const filterCategoryValue = (slug: string) => {
    const categoryResult = filterChecked.category.filter(
      (x) => x.slug === slug
    );
    return categoryResult[0].checked;
  };
  const filterCategoryOnChange = (
    e: { target: { checked: boolean } },
    slug: string
  ) => {
    const index = filterChecked.category.findIndex((x) => x.slug === slug);
    let categoryArr = filterChecked.category;
    categoryArr[index].checked = e.target.checked;
    setFilterChecked({ ...filterChecked, category: categoryArr });
  };

  useEffect(() => {
    const updateFilter = async () => {
      let result = ebooks;

      try {
        // format
        const checkedFormatArr = await filterChecked.format
          .filter((format) => format.checked)
          .map((format) => format.id);
        result = await result.filter((x) =>
          checkedFormatArr.includes(x.formatId)
        );
      } catch (err: any) {
        console.error(err.message);
      }

      try {
        // category
        const checkedCategoryArr = await filterChecked.category
          .filter((category) => category.checked)
          .map((category) => category.id);
        result = await result.filter((x) =>
          checkedCategoryArr.includes(x.categoryId)
        );
      } catch (err: any) {
        console.error(err.message);
      }

      try {
        // keyword
        result = await result.filter(
          (x) =>
            x.title.includes(filterChecked.keyword) ||
            (x.authors && x.authors[0].includes(filterChecked.keyword))
        );
      } catch (err: any) {
        console.error(err.message);
      }

      try {
        // is_deleted
        if (filterChecked.is_deleted !== true) {
          result = await result.filter((x) => x.isDeleted === false);
        }
      } catch (err: any) {
        console.error(err.message);
      }

      try {
        // is_recommended
        if (filterChecked.is_recommended !== true) {
          result = await result.filter((x) => x.isRecommended === true);
        }
      } catch (err: any) {
        console.error(err.message);
      }

      try {
        // sale
        if (filterChecked.sale !== 0) {
          result = await result.filter((x) => {
            if (
              x.sales &&
              x.sales.some((y) => y.saleId === filterChecked.sale)
            ) {
              return x;
            }
          });
        }
      } catch (err: any) {
        console.error(err.message);
      }

      setFilteredEbooks(result);
    };
    updateFilter();
  }, [ebooks, filterChecked]);

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">登録済みの電子書籍一覧</h2>

          <div className="space-y-2 text-sm mt-3">
            <fieldset className="space-x-4 flex items-center">
              <div className="w-28">セール：</div>
              <div className="flex-1">
                <select
                  id="location"
                  name="location"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                  value={filterChecked.sale}
                  onChange={(e) =>
                    setFilterChecked({
                      ...filterChecked,
                      sale: Number(e.target.value),
                    })
                  }
                >
                  <option value="0">選択しない</option>
                  {sales.map((sale) => (
                    <option key={sale.id} value={sale.id}>
                      {sale.title}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset className="space-x-4 flex items-center">
              <div className="w-28">フォーマット：</div>
              {formats.map((format) => (
                <div className="relative flex items-start" key={format.id}>
                  <div className="flex items-center h-5">
                    <input
                      id={`format-${format.id}`}
                      type="checkbox"
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                      checked={filterFormatValue(format.slug)}
                      onChange={(e) => filterFormatOnChange(e, format.slug)}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor={`format-${format.id}`}
                      className="font-medium text-gray-700"
                    >
                      {format.name}
                    </label>
                  </div>
                </div>
              ))}
            </fieldset>
            <fieldset className="space-x-4 flex items-center">
              <div className="w-28">カテゴリー：</div>
              {categories.map((category) => (
                <div className="relative flex items-start" key={category.id}>
                  <div className="flex items-center h-5">
                    <input
                      id={`category-${category.id}`}
                      type="checkbox"
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                      checked={filterCategoryValue(category.slug)}
                      onChange={(e) => filterCategoryOnChange(e, category.slug)}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor={`category-${category.id}`}
                      className="font-medium text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                </div>
              ))}
            </fieldset>
            <fieldset className="space-x-4 flex items-center">
              <div className="w-28">キーワード：</div>
              <div className="flex-1">
                <label htmlFor="keyword" className="sr-only">
                  Keyword
                </label>
                <input
                  type="text"
                  id="keyword"
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md px-2 py-1"
                  value={filterChecked.keyword}
                  onChange={(e) =>
                    setFilterChecked({
                      ...filterChecked,
                      keyword: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset>
            <div className="space-x-4 flex items-start">
              <fieldset className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="deleted"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                    checked={filterChecked.is_deleted}
                    onChange={(e) =>
                      setFilterChecked({
                        ...filterChecked,
                        is_deleted: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="deleted"
                    className="font-medium text-gray-700"
                  >
                    削除済みも表示
                  </label>
                </div>
              </fieldset>
              <fieldset className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="recommended"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                    checked={filterChecked.is_recommended}
                    onChange={(e) =>
                      setFilterChecked({
                        ...filterChecked,
                        is_recommended: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="recommended"
                    className="font-medium text-gray-700"
                  >
                    オススメ以外も表示
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={refreshData}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          リストを更新
        </button>
      </div>

      <p className="mt-5 text-sm text-gray-700">
        {filteredEbooks.length}件 {isRefreshing && <span>Refreshing...</span>}
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
                amazon_id
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
                comment
              </th>
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
                points
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
            {filteredEbooks.map((ebook: Ebook) => (
              <tr
                key={ebook.id}
                className={`${
                  ebook.isDeleted
                    ? "bg-gray-100 text-gray-400"
                    : "text-gray-900"
                } ${ebook.isRecommended && "bg-yellow-50"}`}
              >
                <td className="pl-4 pr-2 py-2 text-sm">{ebook.id}</td>
                <td className="px-2 py-2 text-sm">{ebook.amazonId}</td>
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
                <td className="px-2 py-2 text-sm font-medium">{ebook.title}</td>
                <td className="px-2 py-2 text-sm font-medium">
                  {ebook.format && ebook.format.name}
                </td>
                <td className="px-2 py-2 text-sm font-medium">
                  {ebook.category && ebook.category.name}
                </td>
                <td className="px-2 py-2 text-sm font-medium">
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
                    refreshData={refreshData}
                  />
                </td>
                <td className="px-2 py-2 text-sm">
                  <DeleteEbook ebook={ebook} refreshData={refreshData} />
                </td>
                <td className="px-2 py-2 text-sm text-red-500">
                  {ebook.price && `¥${ebook.price}`}
                </td>
                <td className="px-2 py-2 text-sm text-red-500">
                  {ebook.points && `${ebook.points}pt`}
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

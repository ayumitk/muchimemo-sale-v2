import moment from "moment";
import "moment-timezone";
import { ChatAltIcon } from "@heroicons/react/solid";

// types
import { Ebook, Format, Category, Sale } from "../../interfaces";

// components
import EditSale from "./EditSale";
import DeleteSale from "./DeleteSale";
import EditEbooksOnSale from "./EditEbooksOnSale";

const ListSale = (props: {
  sales: Sale[];
  ebooks: Ebook[];
  refreshData: any;
  isRefreshing: boolean;
}) => {
  const { sales, ebooks, refreshData, isRefreshing } = props;

  const remainingDays = (saleEnds: string) => {
    const now = moment().tz("Asia/Tokyo").format();
    const end = moment(saleEnds).add(9, "h").format();
    const diff = moment(end).diff(now);
    return diff >= 0;
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">登録済みのセール一覧</h2>
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
        {sales.length}件 {isRefreshing && <span>Refreshing...</span>}
      </p>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ebooks
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                sale_ends
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                edit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr
                key={sale.id}
                className={
                  sale.isDeleted || !remainingDays(sale.saleEnds)
                    ? "bg-gray-100 text-gray-400"
                    : ""
                }
              >
                <td className="px-6 py-4 text-sm">{sale.id}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <a
                    href={`/sale/${sale.id}/`}
                    className="hover:text-teal-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sale.title}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <ChatAltIcon
                    className={`w-5 h-5 ${
                      sale.description ? "text-red-500" : "text-gray-300"
                    }`}
                  />
                </td>
                <td className="px-6 py-4 text-sm">
                  <EditEbooksOnSale
                    sale={sale}
                    ebooks={ebooks}
                    refreshData={refreshData}
                  />
                </td>
                <td className="px-6 py-4 text-sm">
                  {moment(sale.saleEnds).format("YYYY-MM-DD")}
                  {remainingDays(sale.saleEnds)}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {`${sale.isPublished ? "公開" : "下書き"}`}
                </td>
                <td className="px-6 py-4 text-sm">
                  <EditSale sale={sale} refreshData={refreshData} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <DeleteSale sale={sale} refreshData={refreshData} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListSale;

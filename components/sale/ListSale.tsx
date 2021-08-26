import { useEffect, useState } from "react";
import { ChatAltIcon } from "@heroicons/react/solid";
import Image from "next/image";
import moment from "moment";

// types
import { Ebook, Format, Category, Sale } from "../../interfaces";

// components
import EditSale from "./EditSale";
import DeleteSale from "./DeleteSale";
// import UpdateEbook from "./UpdateEbook";

const ListSale = (props: { sales: Sale[] }) => {
  const { sales } = props;

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">登録済みのセール一覧</h2>
        </div>
      </div>

      <p className="mt-5 text-sm text-gray-700">{sales.length}件</p>

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
                  sale.isDeleted ? "bg-gray-100 text-gray-400" : "text-gray-900"
                }
              >
                <td className="px-6 py-4 text-sm">{sale.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{sale.title}</td>
                <td className="px-6 py-4 text-sm">
                  {sale.ebooks && sale.ebooks.length}
                </td>
                <td className="px-6 py-4 text-sm">
                  {moment(sale.saleEnds).format("YYYY-MM-DD")}
                  <span className="ml-2 whitespace-nowrap">
                    {/* {sale.remaining_days >= 0
                      ? `残り${sale.remaining_days}日`
                      : `終了済み`} */}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {`${sale.isPublished ? "公開" : "下書き"}`}
                </td>
                <td className="px-6 py-4 text-sm">
                  <EditSale sale={sale} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <DeleteSale sale={sale} />
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

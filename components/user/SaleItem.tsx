import { useEffect, useState } from "react";
import { BadgeCheckIcon, StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

// components
import Date from "../../components/date";
import ShowSaleEnds from "./ShowSaleEnds";

// types
import { Sale, Ebook } from "../../interfaces";

const SaleItem = (props: { sale: Sale }) => {
  const { sale } = props;

  const now = moment().tz("Asia/Tokyo").format("YYYY,MM,DD");
  const nowArr = now.split(",");

  const end = moment(sale.saleEnds).add(9, "h").format("YYYY,MM,DD");
  const endArr = end.split(",");

  const diff = moment(endArr).diff(moment(nowArr), "days");

  const [ebookOnSale, setEbookOnSale] = useState<Ebook[]>();
  useEffect(() => {
    const result = sale.ebooks
      .map((item) => item.ebook)
      .sort((x: Ebook) => {
        if (x.isRecommended) {
          return -1;
        } else {
          return 1;
        }
      });
    setEbookOnSale(result);
  }, [sale]);

  return (
    <li className="shadow mb-8">
      <Link href={`/sale/${sale.id}/`}>
        <a>
          <div className="px-4 py-5 sm:p-6 hover:bg-yellow-50 border-4 border-gray-900 relative">
            <ShowSaleEnds
              remainingDays={diff + 1}
              className="-left-3 top-2 sm:top-2.5 absolute"
            />
            <h3 className="text-xl sm:text-2xl font-bold pt-6 border-dotted border-b-4 border-gray-700 pb-3 mb-4">
              {sale.title}
            </h3>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              {sale.ebooks &&
                sale.ebooks.map(
                  (item) =>
                    item.ebook.isRecommended && (
                      <span key={item.ebook.id}>『{item.ebook.title}』</span>
                    )
                )}
              など
              <span className="font-bold text-red-600">
                {sale.ebooks && sale.ebooks.length}作品
              </span>
              が対象です
            </p>
            <div className="overflow-hidden">
              <div className="flex">
                {ebookOnSale &&
                  ebookOnSale.map(
                    (ebook, index) =>
                      index < 7 && (
                        <img
                          src={ebook.imageUrl}
                          alt={`${ebook.imageUrl}の表紙`}
                          className="w-16 sm:w-24 mr-1 border border-gray-200"
                          key={ebook.id}
                          loading="lazy"
                        />
                      )
                  )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default SaleItem;

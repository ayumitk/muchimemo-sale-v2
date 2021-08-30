import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";

// components
import ShowSaleEnds from "./ShowSaleEnds";

// types
import { Sale, Ebook } from "../../interfaces";

const SaleItem = (props: { sale: Sale }) => {
  const { sale } = props;

  const now = moment().tz("Asia/Tokyo").format();
  const end = moment(sale.saleEnds).add(9, "h").format();
  const diff = moment(end).diff(now);
  let remainingDays = -1;
  if (diff >= 0) {
    remainingDays = moment.duration(diff).days();
  }

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
              remainingDays={remainingDays + 1}
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
                          className="h-28 sm:h-36 mr-1 border border-gray-200"
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

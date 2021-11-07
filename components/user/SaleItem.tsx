import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

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
    remainingDays = Math.trunc(moment.duration(diff).asDays());
  }

  const [ebookOnSale, setEbookOnSale] = useState<Ebook[]>();
  useEffect(() => {
    const recommendedEbooks = sale.ebooks
      .map((item) => item.ebook)
      .filter((ebook) => ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const restOfEbooks = sale.ebooks
      .map((item) => item.ebook)
      .filter((ebook) => !ebook.isRecommended)
      .sort((a: Ebook, b: Ebook) => a.title.localeCompare(b.title));
    const result = recommendedEbooks.concat(restOfEbooks);
    setEbookOnSale(result);
  }, [sale]);

  if (remainingDays < 0) {
    return (
      <li className="mb-3 pb-3 border-b">
        <Link href={`/sale/${sale.id}`}>
          <a>
            <div className="relative">
              <span className="bg-gray-300 inline-block p-1 text-xs font-bold">
                このセールは終了しました
              </span>
              <h3 className="font-bold leading-tight text-sm my-1 text-gray-900">
                {sale.title}
              </h3>
              <p className="text-xs text-gray-500">
                {sale.description ? (
                  sale.description
                ) : (
                  <>
                    {sale.ebooks &&
                      sale.ebooks.map(
                        (item) =>
                          item.ebook.isRecommended && (
                            <span key={item.ebook.id}>
                              『{item.ebook.title}』
                            </span>
                          )
                      )}
                    など
                    <span className="font-bold text-red-600">
                      {sale.ebooks && sale.ebooks.length}作品
                    </span>
                    が対象です
                  </>
                )}
              </p>
            </div>
          </a>
        </Link>
      </li>
    );
  }

  return (
    <li className="shadow mb-8">
      <Link href={`/sale/${sale.id}`}>
        <a>
          <div className="px-4 py-5 sm:p-6 border-4 relative border-gray-900 hover:bg-yellow-50">
            <ShowSaleEnds
              remainingDays={remainingDays + 1}
              className="-left-3 top-2 sm:top-2.5 absolute"
            />
            <h3 className="font-noto-sans font-black leading-tight text-xl sm:text-2xl pt-6 border-dotted border-b-4 pb-3 sm:mb-3 mb-2 border-gray-700">
              {sale.title}
            </h3>
            <p className="sm:mb-4 mb-3 text-sm sm:text-base text-gray-700">
              {sale.description ? (
                sale.description
              ) : (
                <>
                  {sale.ebooks &&
                    sale.ebooks.map(
                      (item) =>
                        item.ebook.isRecommended && (
                          <span key={item.ebook.id}>
                            『{item.ebook.title}』
                          </span>
                        )
                    )}
                  など
                  <span className="font-bold text-red-600">
                    {sale.ebooks && sale.ebooks.length}作品
                  </span>
                  が対象です
                </>
              )}
            </p>
            <div className="overflow-hidden">
              <div className="flex">
                {ebookOnSale &&
                  ebookOnSale.map(
                    (ebook, index) =>
                      index < 7 && (
                        <div
                          className="w-20 sm:w-24 mr-1 flex-shrink-0"
                          style={{ lineHeight: 0 }}
                          key={ebook.id}
                        >
                          <Image
                            src={
                              ebook.imageUrl
                                ? ebook.imageUrl
                                : "/images/placeholder.svg"
                            }
                            alt={`${ebook.title}の表紙`}
                            width={
                              ebook.imageWidth ? ebook.imageWidth / 3 : 343
                            }
                            height={
                              ebook.imageHeight ? ebook.imageHeight / 3 : 500
                            }
                            placeholder="blur"
                            blurDataURL="/images/placeholder.svg"
                          />
                        </div>
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

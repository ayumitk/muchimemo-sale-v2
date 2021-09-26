import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import moment from "moment";
import "moment-timezone";
import Image from "next/image";

// types
import { Author, Ebook } from "../../interfaces";

const EbookItem = (props: { ebook: Ebook; remainingDays: number }) => {
  const { ebook, remainingDays } = props;

  return (
    <li
      className={`border-t border-gray-900 px-3 sm:px-6 py-5 ${
        ebook.isRecommended && "bg-yellow-50"
      }`}
      id={`item-${ebook.id}`}
    >
      <div className="flex">
        <a
          href={`https://www.amazon.co.jp/dp/${ebook.amazonId}?tag=ayutak04-22&linkCode=ogi&th=1&psc=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 w-24 sm:w-28"
          style={{ lineHeight: 0 }}
        >
          <Image
            src={ebook.imageUrl ? ebook.imageUrl : "/images/placeholder.svg"}
            alt={`${ebook.title}の表紙`}
            width={ebook.imageWidth ? ebook.imageWidth : 343}
            height={ebook.imageHeight ? ebook.imageHeight : 500}
            placeholder="blur"
            blurDataURL="/images/placeholder.svg"
          />
        </a>
        <div className="ml-3 sm:ml-5 flex-1">
          <p className="text-gray-700 text-sm sm:text-base mb-2">
            <span
              className={`text-xs py-0.5 px-2 mr-1 rounded-sm border ${
                ebook.formatId === 2
                  ? "bg-pink-50 text-pink-600 border-pink-600"
                  : "bg-blue-50 text-blue-600 border-blue-600"
              }`}
            >
              {ebook.format.name}
            </span>
            <span className="text-xs py-0.5 px-2 mr-2 rounded-sm border border-gray-700 bg-gray-50">
              {ebook.category.name}
            </span>
          </p>
          <h2 className="font-bold text-lg sm:text-2xl leading-tight sm:mb-1">
            {ebook.title}
          </h2>

          <div className="text-gray-700 text-sm sm:text-base">
            {ebook.authors &&
              JSON.parse(ebook.authors).map((author: Author, index: number) => (
                <span
                  key={`${index}-${author.Name}`}
                  className="mr-2"
                >{`${author.Name}(${author.Role})`}</span>
              ))}

            <span className="mr-2">{ebook.publisher}</span>

            {ebook.labelId !== 1 && (
              <Link href={`/label/${ebook.label.slug}`}>
                <a className="text-blue-700 hover:underline mr-1">
                  {ebook.label.name}
                </a>
              </Link>
            )}

            {ebook.reviewCount && ebook.reviewCount > 0 ? (
              <span className="whitespace-nowrap">
                <StarIcon className="w-5 h-5 text-yellow-400 inline-block -mt-1" />
                <span className="font-bold text-teal-600">
                  {ebook.reviewAverage}
                </span>
                <span className="text-xs text-gray-700 ml-0.5">
                  ({ebook.reviewCount})
                </span>
              </span>
            ) : (
              ""
            )}
          </div>

          {remainingDays >= 0 && (
            <p className="text-red-600 leading-none mt-0.5 font-bold">
              {ebook.price > 0 ? (
                <>
                  <span className="">¥{ebook.price}</span>{" "}
                </>
              ) : (
                <>
                  <span className="">無料</span>{" "}
                </>
              )}
              {ebook.price > 0 ? (
                <>
                  <span className="text-sm">
                    ({ebook.points}
                    <span className="text-xs">ポイント獲得</span>)
                  </span>{" "}
                </>
              ) : (
                ""
              )}
              <span className="text-xs whitespace-nowrap font-normal">
                ※Amazon {moment(ebook.updatedAt).format("YYYY/MM/DD hh:mm:ss")}
                時点
              </span>
            </p>
          )}

          <div className="mt-2 flex flex-wrap">
            <a
              href={`https://www.amazon.co.jp/dp/${ebook.amazonId}?tag=ayutak04-22&linkCode=ogi&th=1&psc=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-1 mb-1 inline-flex items-center justify-center w-24 sm:w-32 h-11 sm:h-12 border border-gray-400 shadow-sm text-base rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            >
              <span className="sr-only">Amazonで購入する</span>
              <span className="w-14 sm:w-16" style={{ lineHeight: 0 }}>
                <Image
                  src="/images/amazon-logo.png"
                  alt="Amazonのロゴ"
                  width={550}
                  height={166}
                />
              </span>
            </a>
            {ebook.rentaId && (
              <a
                href={`https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731192&vc_url=https%3A%2F%2Frenta.papy.co.jp%2Frenta%2Fsc%2Ffrm%2Fitem%2F${ebook.rentaId}%2F`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-1 mb-1 inline-flex items-center justify-center w-24 sm:w-32 h-11 sm:h-12 border border-gray-400 shadow-sm text-base rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <span className="sr-only">Renta!で購入する</span>
                <span className="w-14 sm:w-16" style={{ lineHeight: 0 }}>
                  <Image
                    src="/images/renta-logo.png"
                    alt="Renta!のロゴ"
                    width={550}
                    height={144}
                  />
                </span>
              </a>
            )}
            {ebook.cmoaId && (
              <a
                href={`https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731152&vc_url=https%3A%2F%2Fwww.cmoa.jp%2Ftitle%2F${ebook.cmoaId}%2F%E3%80%80%E3%81%82`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-1 mb-1 inline-flex items-center justify-center w-24 sm:w-32 h-11 sm:h-12 border border-gray-400 shadow-sm text-base rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <span className="sr-only">シーモアで購入する</span>
                <span className="w-12 sm:w-14" style={{ lineHeight: 0 }}>
                  <Image
                    src="/images/cmoa-logo.png"
                    alt="シーモアのロゴ"
                    width={500}
                    height={214}
                  />
                </span>
              </a>
            )}
            {ebook.dmmId && (
              <a
                href={`https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fdetail%2F${ebook.dmmId}%2F&af_id=muchimemo-001&ch=link_tool&ch_id=link`}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-1 mb-1 inline-flex items-center justify-center w-24 sm:w-32 h-11 sm:h-12 border border-gray-400 shadow-sm text-base rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <span className="sr-only">DMMブックスで購入する</span>
                <span className="w-20 sm:w-24" style={{ lineHeight: 0 }}>
                  <Image
                    src="/images/dmm-logo.svg"
                    alt="DMMブックスのロゴ"
                    width={240}
                    height={56}
                  />
                </span>
              </a>
            )}
          </div>
          {ebook.sales && (
            <ul className="mt-1.5 text-xs sm:text-sm">
              {ebook.sales.map((item) => {
                const now = moment().tz("Asia/Tokyo").format();
                const end = moment(item.sale.saleEnds).add(9, "h").format();
                const diff = moment(end).diff(now);
                if (diff >= 0) {
                  return (
                    <li key={item.sale.id}>
                      <Link href={`/sale/${item.sale.id}`}>
                        <a className="text-blue-700 hover:underline">
                          {item.sale.title}
                        </a>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      </div>
      {ebook.comment && (
        <div className="flex mt-3">
          <div className="mt-2 w-10">
            <Image
              src="/images/gina-avatar.jpg"
              alt="ジーナのアイコン"
              className="rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="rounded-xl p-4 sm:p-5 flex-1 ml-4 relative bg-yellow-100 text-gray-700 text-sm sm:text-base">
            <span
              className="absolute block w-0 h-0"
              style={{
                content: "",
                left: `-10px`,
                top: `30px`,
                marginTop: `-15px`,
                borderRight: `15px solid #FEF3C9`,
                borderTop: `15px solid transparent`,
                borderBottom: `15px solid transparent`,
              }}
            ></span>
            <div
              dangerouslySetInnerHTML={{
                __html: ebook.comment.replace(/\r?\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default EbookItem;

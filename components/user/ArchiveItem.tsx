import Link from "next/link";
import moment from "moment";
import "moment/locale/ja";
import Image from "next/image";

// components
import ShowSaleEnds from "./ShowSaleEnds";

// types
import { Archive } from "../../interfaces";

const ArchiveItem = (props: { archive: Archive; index: number }) => {
  const { archive, index } = props;
  const year = moment(archive.id).format("Y") + "年";
  const month = moment(archive.id).format("MMMM");

  return (
    <li>
      <Link href={`/archives/${archive.id}`}>
        <a className="border-t-4 border-gray-900 block hover:bg-yellow-50">
          <h2 className="text-2xl sm:text-3xl font-black py-1 sm:py-2 text-center border-b border-gray-900 mb-2 font-noto-sans">
            {year}
            {month}
          </h2>
          <div className="flex">
            {archive.ebooks.map((ebook, index) => {
              if (index < 4) {
                return (
                  <div key={ebook.id} style={{ lineHeight: 0 }}>
                    <Image
                      src={
                        ebook.imageUrl
                          ? ebook.imageUrl
                          : "/images/placeholder.svg"
                      }
                      alt={`${ebook.title}の表紙`}
                      width={ebook.imageWidth ? ebook.imageWidth / 3 : 343}
                      height={ebook.imageHeight ? ebook.imageHeight / 3 : 500}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.svg"
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="text-sm text-gray-700 pb-8 pt-2">
            {archive.ebooks.map((ebook, index) => {
              if (index < 4) {
                return (
                  <div key={ebook.id} className="line-clamp-1">
                    {ebook.title}
                  </div>
                );
              }
            })}
            など、{archive.ebooks.length}作品
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ArchiveItem;

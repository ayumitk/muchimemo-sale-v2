import Link from "next/link";
import "moment-timezone";
import Image from "next/image";

// types
import { Ebook, Sale } from "../../interfaces";

const PickupItem = (props: { ebook: Ebook; sale: Sale }) => {
  const { ebook, sale } = props;

  return (
    <li>
      <Link href={`/sale/${sale.id}`}>
        <a>
          <span
            className="block hover:opacity-80 relative"
            style={{ lineHeight: 0 }}
          >
            <Image
              src={ebook.imageUrl ? ebook.imageUrl : "/images/placeholder.svg"}
              alt={`${ebook.title}の表紙`}
              width={ebook.imageWidth ? ebook.imageWidth / 3 : 343}
              height={ebook.imageHeight ? ebook.imageHeight / 3 : 500}
              placeholder="blur"
              blurDataURL="/images/placeholder.svg"
            />
          </span>
          <span className="inline-block mt-2 mb-1 text-xs bg-red-600 text-white py-0.5 px-1 rounded-sm whitespace-nowrap">
            {sale.title.substring(0, sale.title.indexOf("】")).slice(1)}
          </span>
          <span className="block text-sm line-clamp-2 leading-snug">
            {ebook.title}
          </span>
        </a>
      </Link>
    </li>
  );
};

export default PickupItem;

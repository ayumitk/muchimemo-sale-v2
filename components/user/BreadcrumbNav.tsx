import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/outline";

const BreadcrumbNav = (props: {
  pageTitle: string;
  sale?: boolean;
  archive?: boolean;
}) => {
  const { pageTitle, sale, archive } = props;
  return (
    <ul className="text-xs flex mb-6 sm:mb-10 text-gray-500 leading-tight px-4 md:px-6 lg:px-0 mt-4 max-w-3xl mx-auto">
      <li className="whitespace-nowrap">
        <Link href="/">
          <a className="text-blue-700 hover:underline">ホーム</a>
        </Link>
        <ChevronRightIcon className="w-3 h-3 inline-block mx-1" />
      </li>
      {sale && (
        <li className="whitespace-nowrap">
          <Link href="/sale">
            <a className="text-blue-700 hover:underline">セール</a>
          </Link>
          <ChevronRightIcon className="w-3 h-3 inline-block mx-1" />
        </li>
      )}
      {archive && (
        <li className="whitespace-nowrap">
          <Link href="/archives">
            <a className="text-blue-700 hover:underline">月別おすすめ</a>
          </Link>
          <ChevronRightIcon className="w-3 h-3 inline-block mx-1" />
        </li>
      )}
      <li>{pageTitle}</li>
    </ul>
  );
};

export default BreadcrumbNav;

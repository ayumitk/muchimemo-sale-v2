import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/outline";

const BreadcrumbNav = (props: { pageTitle: string }) => {
  const { pageTitle } = props;
  return (
    <ul className="text-xs sm:text-sm flex mb-6 sm:mb-10 text-gray-500 leading-tight">
      <li className="whitespace-nowrap">
        <Link href="/">
          <a className="text-blue-700 hover:underline">ホーム</a>
        </Link>
        <ChevronRightIcon className="w-3 h-3 inline-block mx-1" />
      </li>
      <li>{pageTitle}</li>
    </ul>
  );
};

export default BreadcrumbNav;

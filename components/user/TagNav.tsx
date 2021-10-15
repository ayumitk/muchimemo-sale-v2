import Link from "next/link";
import { TagIcon } from "@heroicons/react/solid";

// types
import { Tag } from "../../interfaces";

export default function TagNav(props: { tags: Tag[] }) {
  const { tags } = props;
  return (
    <nav className="flex mt-6 flex-wrap bg-gray-100 py-3 sm:px-4 px-2 border border-gray-200">
      <div className="w-full text-gray-600" style={{ fontSize: "0.687rem" }}>
        その他のタグもチェック！
      </div>
      {tags.map((tag) => (
        <Link href={`/tag/${tag.slug}`} key={tag.id}>
          <a className="inline-flex items-center text-blue-700 hover:underline mr-3 text-sm sm:text-base">
            <TagIcon className="mr-0.5 h-4 w-4" aria-hidden="true" />
            {tag.name}
          </a>
        </Link>
      ))}
    </nav>
  );
}

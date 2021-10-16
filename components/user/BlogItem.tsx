import Image from "next/image";

// types
import { Blog } from "../../interfaces";

const BlogItem = (props: { post: Blog }) => {
  const { post } = props;

  return (
    <li
      key={post.id}
      className="flex sm:py-8 py-5 border-b-4 border-dotted border-gray-900"
    >
      <a
        href={`https://muchimemo.com/bl-manga/${post.slug}/`}
        className="sm:w-60 w-28 sm:mr-5 mr-3 block"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={post.image}
          alt={`${post.title}のイメージ画像`}
          width={800}
          height={800}
          placeholder="blur"
          blurDataURL="/images/placeholder.svg"
          className="hover:opacity-80"
        />
      </a>
      <div className="flex-1">
        <h2 className="sm:mt-3">
          <a
            href={`https://muchimemo.com/bl-manga/${post.slug}/`}
            className="font-black sm:text-2xl text-lg hover:text-gray-700 hover:underline leading-snug tracking-tight font-noto-sans"
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.title}
          </a>
        </h2>
        <p className="text-gray-700 text-xs sm:text-base line-clamp-4 mt-1 sm:mt-3">
          {post.description}
        </p>
      </div>
    </li>
  );
};

export default BlogItem;

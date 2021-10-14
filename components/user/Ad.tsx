import Image from "next/image";

// types
import { AdData } from "../../interfaces";

const Ad = (props: { className?: string; adData: AdData }) => {
  const { className, adData } = props;

  return (
    <>
      {adData && (
        <div className={className} style={{ lineHeight: 0 }}>
          <a
            className="hidden sm:block hover:opacity-80"
            href={adData.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`/images/banners/${adData.id}_728.jpg`}
              alt={adData.name}
              width={728}
              height={90}
              placeholder="blur"
              blurDataURL="/images/placeholder.svg"
            />
          </a>
          <a
            className="block sm:hidden hover:opacity-80"
            href={adData.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`/images/banners/${adData.id}_300.jpg`}
              alt={adData.name}
              width={300}
              height={250}
              placeholder="blur"
              blurDataURL="/images/placeholder.svg"
            />
          </a>
        </div>
      )}
    </>
  );
};

export default Ad;

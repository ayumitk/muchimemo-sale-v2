import React, { useEffect } from "react";

declare const window: any;

const Adsense = (props: {
  square?: boolean;
  feed?: boolean;
  className?: string;
}) => {
  useEffect(() => {
    let adsbygoogle = window.adsbygoogle;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { square, feed, className } = props;

  if (feed) {
    return (
      <div className={className}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-fr+a-2-ip+12y"
          data-ad-client="ca-pub-2243735568608949"
          data-ad-slot="3230248784"
        />
      </div>
    );
  }
  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2243735568608949"
        data-ad-slot="4781975935"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Adsense;

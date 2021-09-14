import React, { useEffect } from "react";

declare const window: any;

const Adsense = (props: { square?: boolean; feed?: boolean }) => {
  useEffect(() => {
    let adsbygoogle = window.adsbygoogle;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { square, feed } = props;

  if (feed) {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-fr+a-2-ip+12y"
        data-ad-client="ca-pub-2243735568608949"
        data-ad-slot="3230248784"
      />
    );
  }
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2243735568608949"
      data-ad-slot="4781975935"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default Adsense;

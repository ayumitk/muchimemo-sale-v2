import Image from "next/image";

const AffiliateBanners = (props: { saleId: number }) => {
  const { saleId } = props;
  return (
    <>
      {saleId === 12 && (
        <div className="mt-7 sm:flex">
          <div className="sm:mr-4">
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼Renta!の特設ページ
            </div>
            <a
              href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731192&vc_url=https%3A%2F%2Frenta.papy.co.jp%2Frenta%2Fsc%2Ffrm%2Fpage%2Ftopics%2Fbc_35827_20210901.htm%3Fref%3Dvc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-44 w-36"
            >
              <Image
                src="https://img.papy.co.jp/lc/renta/img/label/tp_35827_l_02.png"
                alt="Renta!の特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={360}
                height={225}
              />
            </a>
          </div>
        </div>
      )}

      {saleId === 25 && (
        <div className="mt-7 sm:flex">
          <div className="sm:mr-4">
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼コミックシーモアの特設ページ
            </div>
            <a
              href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731152&vc_url=https%3A%2F%2Fwww.cmoa.jp%2Fsale%2F210910_hikbr%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-64 w-52"
            >
              <Image
                src="https://cmoa.akamaized.net/auto/images/sale/210910_hikbr/upper_20210910.jpg"
                alt="コミックシーモアの特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={770}
                height={320}
              />
            </a>
          </div>
          <div className="sm:mr-4">
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼Renta!の特設ページ
            </div>
            <a
              href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731192&vc_url=https%3A%2F%2Frenta.papy.co.jp%2Frenta%2Fsc%2Ffrm%2Fpage%2Ftopics%2Fbc_taiyoutosyo.htm%3Fref%3Dvc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-44 w-36"
            >
              <Image
                src="https://img.papy.co.jp/lc/renta/img/item/tp_taiyoutosyo_l_01.png"
                alt="Renta!の特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={360}
                height={225}
              />
            </a>
          </div>
          <div>
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼DMMブックスの特設ページ
            </div>
            <a
              href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Flist%2Fcampaign%2FhuG*3ueGgrOzhrCO0LTs1OPW1bWD2ueugeGbhbHm1LLKgrKARgKCsreMtLXXicffyf3TiYUZgqXKho%2Ct0eSm0*Tl1ZT20eiL0f63%2F&af_id=muchimemo-001&ch=toolbar&ch_id=link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-60 w-48"
            >
              <Image
                src="https://ebook-assets.dmm.com/p/bnr/dc/rotation/book_210825153730haishinkinen_g.jpg"
                alt="DMMブックスの特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={500}
                height={220}
              />
            </a>
          </div>
        </div>
      )}

      {saleId === 16 && (
        <div className="mt-7 sm:flex">
          <div>
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼DMMブックスの特設ページ
            </div>
            <a
              href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Flist%2Fcampaign%2Fgsai2ueRhLq*hrCz0LTtdS1X0ous3Pe4i*e6go3EF9nWxNaM0dXjutvkt92epomL542DktaL19zVxNLUioK*iYz6tg__%2F&af_id=muchimemo-001&ch=toolbar&ch_id=link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-60 w-48"
            >
              <Image
                src="https://ebook-assets.dmm.com/p/bnr/dc/rotation/book_210823152855ByoudeWakaru_g.jpg"
                alt="DMMブックスの特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={500}
                height={220}
              />
            </a>
          </div>
        </div>
      )}

      {saleId === 24 && (
        <div className="mt-7 sm:flex">
          <div className="sm:mr-4">
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼コミックシーモアの特設ページ
            </div>
            <a
              href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731152&vc_url=https%3A%2F%2Fwww.cmoa.jp%2Fspecial%2F%3Fpage_id%3D210910_hanaotonohi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-64 w-52"
            >
              <Image
                src="https://www.cmoa.jp/auto/images/210910_hanaotonohi/upper_20210910.jpg"
                alt="コミックシーモアの特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={770}
                height={320}
              />
            </a>
          </div>
          <div className="sm:mr-4">
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼Renta!の特設ページ
            </div>
            <a
              href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731192&vc_url=https%3A%2F%2Frenta.papy.co.jp%2Frenta%2Fsc%2Ffrm%2Fpage%2Ftopics%2Fbc_35593_20210910.htm%3Fref%3Dvc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-44 w-36"
            >
              <Image
                src="https://img.papy.co.jp/lc/renta/img/label/tp_35593_l_02.png?09100000"
                alt="Renta!の特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={360}
                height={225}
              />
            </a>
          </div>
          <div>
            <div className="font-bold mb-1 text-sm sm:text-base">
              ▼DMMブックスの特設ページ
            </div>
            <a
              href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Flist%2Fcampaign%2FhuG80eyHiK2LhrCW1aHD1OHo05mO0dWYht*rg6HkAgCK3bV2IHCCsa2Gs5%2CQtMQ_%2F%3Ffloor%3DGbl&af_id=muchimemo-001&ch=toolbar&ch_id=link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block sm:w-60 w-48"
            >
              <Image
                src="https://ebook-assets.dmm.com/p/bnr/dc/rotation/book_210825173207hanaoto_g.jpg"
                alt="DMMブックスの特設ページ"
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
                width={500}
                height={220}
              />
            </a>
          </div>
        </div>
      )}

      {saleId === 23 && (
        <div className="mt-7">
          <div className="font-bold mb-1">▼コミックシーモアの特設ページ</div>
          <a
            href="https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3549505&pid=886731152&vc_url=https%3A%2F%2Fwww.cmoa.jp%2Fspecial%2F%3Fpage_id%3D210910_gentosyacomics_coupon%26page_no%3D2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block sm:w-64 w-52"
          >
            <img
              src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3549505&pid=886731152"
              height={1}
              width={0}
              alt="gifbanner"
            />
            <Image
              src="https://www.cmoa.jp/auto/images/210910_gentosyacomics_coupon/upper_20210910_2.jpg"
              alt="コミックシーモアの特設ページ"
              placeholder="blur"
              blurDataURL="/images/placeholder.svg"
              width={770}
              height={320}
            />
          </a>
        </div>
      )}
    </>
  );
};

export default AffiliateBanners;
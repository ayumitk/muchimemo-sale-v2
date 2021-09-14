import Head from "next/head";
import config from "../config";
import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/outline";

// components
import Layout from "../components/layout";
import BreadcrumbNav from "../components/user/BreadcrumbNav";

export default function AboutPage() {
  const title = "このサイトについて";
  const description = "";

  return (
    <Layout>
      <Head>
        <title>
          {title} - {config.siteTitleAlt}
        </title>
        <meta name="description" content={description} />
        <meta name="image" content={`${config.siteUrl}${config.siteBanner}`} />

        <meta property="og:url" content={`${config.siteUrl}/blog`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          property="og:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />

        <meta name="twitter:url" content={`${config.siteUrl}/blog`} />
        <meta
          name="twitter:title"
          content={`${title} - ${config.siteTitleAlt}`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${config.siteBanner}`}
        />
        <meta
          name="twitter:image:alt"
          content={`${title} - ${config.siteTitleAlt}`}
        />
      </Head>
      <BreadcrumbNav pageTitle={title} />
      <article className="max-w-3xl mx-auto">
        <div className="px-4 md:px-6 lg:px-0">
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-10 mb-6 tracking-tight">
            {title}
          </h1>
          <div className="mx-auto sm:w-20 w-16 mb-4">
            <Image
              src="/images/gina-avatar.jpg"
              alt="ジーナのアイコン"
              className="rounded-full"
              width={100}
              height={100}
            />
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            このサイトは、BLマンガと小説が大好きなジーナ(
            <a
              href="https://twitter.com/muchimemo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              @muchimemo
            </a>
            )が、セール情報をいち早くキャッチしてとにかくたくさんBLが読みたい！という想いで運営しているサイトです。
          </p>
          <p className="text-gray-700 mb-10 leading-relaxed">
            気に入った作品にはおすすめコメントを残していきますので、セールで購入する時の参考にしてもらえると嬉しいです😊
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">広告に関して</h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            「ムチでメモ」は運営維持のため、広告として「Googleアドセンス」「Amazonアソシエイト」を含む第三者配信事業者を利用しています。ご了承ください。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">免責事項</h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            「ムチでメモ」に掲載されている情報の正確さについて可能な限り努力をしていますが、その正確性や適切性に問題がある場合、告知無しに情報を変更･削除する事があります。
            <br />
            当サイトの情報を用いて行う一切の行為、被った損害･損失に対しては、一切の責任を負いかねます。ご了承ください。
          </p>
          <hr className="my-10 sm:my-14" />
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-10 mb-6 tracking-tight">
            お問い合わせ
          </h1>
          <ul>
            <li className="mb-2">
              <a
                href="https://marshmallow-qa.com/muchimemo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                マシュマロ（匿名でのお問い合わせ）
                <ExternalLinkIcon className="w-4 h-4 inline-block sm:ml-0.5" />
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://twitter.com/muchimemo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                Twitter(@muchimemo)のダイレクトメッセージ
                <ExternalLinkIcon className="w-4 h-4 inline-block sm:ml-0.5" />
              </a>
            </li>
            <li>
              <a
                href="https://muchimemo.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline inline-block"
              >
                お問い合わせフォーム
                <ExternalLinkIcon className="w-4 h-4 inline-block sm:ml-0.5" />
              </a>
            </li>
          </ul>
          <hr className="my-10 sm:my-14" />
          <h1 className="font-black text-3xl sm:text-4xl sm:mb-10 mb-4 tracking-tight">
            プライバシーポリシー
          </h1>
          <p className="text-gray-700 mb-10 leading-relaxed">
            本プライバシーポリシーは、ムチでメモ（https://muchimemo.com）（以下、「当サイト」とします。)の各種サービス（当サイトによる情報提供、各種お問合せの受付等）において、当サイトの訪問者（以下、「訪問者」とします。）の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">1．基本方針</h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。当サイトで収集した情報は、利用目的の範囲内で適切に取り扱います。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">2．適用範囲</h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            本プライバシーポリシーは、当サイトにおいてのみ適用されます。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            3．個人情報の取得と利用目的
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトで取得する訪問者の個人情報と利用目的、保存期間等は下記の通りです。
          </p>
          <h3 className="sm:text-xl text-lg font-bold mb-3">
            3-1．お問い合せされた個人情報を取得します
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトでは
            <a
              href="https://muchimemo.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              お問い合わせフォーム
            </a>
            を設けています。
            <br />
            <br />
            訪問者がそのお問い合わせフォームから問い合わせをされた際に入力された、以下の個人情報を取得します。
          </p>
          <ul className="mb-10 list-disc pl-5">
            <li>お問い合わせフォームに入力された名前（HN）</li>
            <li>お問い合わせフォームに入力されたメールアドレス</li>
            <li>お問い合わせフォームに入力されたお問合せ内容</li>
          </ul>
          <h4 className="font-bold mb-3 sm:text-lg">3-1-1．利用目的について</h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            お問い合わせ対応をするためと、訪問者の管理のためです。訪問者からのお問い合わせ情報を保存しておくことによって、同じ訪問者が別のお問い合わせをした際に、過去の問い合わせ内容を踏まえた対応をすることが出来、より的確な対応をすることが出来ます。
            <br />
            <br />
            また、当サイト内で「このようなお問合せがありました」と紹介させていただく場合もあります。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">3-1-2．保存期間について</h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            お問い合わせフォームに入力された個人情報は、3年間保存します。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">
            3-1-3．個人情報取得の同意について
          </h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトでは、お問い合わせフォームからお問い合わせをする前に、当プライバシーポリシーをご一読いただくよう案内しています。
            <br />
            <br />
            お問い合わせをされた時点で、その訪問者は当プライバシーポリシーに同意されたとみなします。
          </p>
          <h3 className="sm:text-xl text-lg font-bold mb-3">
            3-2．Cookieによる個人情報の取得
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、訪問者のコンピュータにCookieを送信することがあります。
            <br />
            <br />
            Cookie（クッキー）とは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、訪問者のコンピュータにファイルとして保存しておく仕組みです。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">3-2-1．利用目的について</h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            訪問者の当サイト閲覧時の利便性を高めるためです。
            <br />
            <br />
            たとえば、次回同じページにアクセスするとCookieの情報を使って、ページの運営者は訪問者ごとに表示を変えることができます。
            <br />
            <br />
            訪問者がブラウザの設定でCookieの送受信を許可している場合、ウェブサイトは、訪問者のブラウザからCookieキーを取得できます。
            <br />
            <br />
            なお、訪問者のブラウザはプライバシー保護のため、そのウェブサイトのサーバーが送受信したCookieのみを送信します。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">3-2-2．保存期間について</h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトに残されたコメントの Cookie は、1年間保存されます。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">
            3-2-3．第三者によるCookie情報の取得について
          </h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトでは、グーグル株式会社やヤフー株式会社などをはじめとする第三者から配信される広告が掲載される場合があり、これに関連して当該第三者が訪問者のCookie情報等を取得して、利用している場合があります。
            <br />
            <br />
            当該第三者によって取得されたCookie情報等は、当該第三者のプライバシーポリシーに従って取り扱われます。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">
            3-2-4．第三者へのCooke情報等の広告配信の利用停止について
          </h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            訪問者は、当該第三者のウェブサイト内に設けられたオプトアウト（個人情報を第三者に提供することを停止すること）ページにアクセスして、当該第三者によるCookie情報等の広告配信への利用を停止することができます。
          </p>
          <h4 className="font-bold mb-3 sm:text-lg">
            3-2-5．Cookie情報の送受信の許可・拒否について
          </h4>
          <p className="text-gray-700 mb-10 leading-relaxed">
            訪問者は、Cookieの送受信に関する設定を「すべてのCookieを許可する」、「すべてのCookieを拒否する」、「Cookieを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります。Cookieに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。
            <br />
            <br />
            すべてのCookieを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を受ける場合がありますのでご注意ください。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            4．個人情報の管理
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、訪問者からご提供いただいた情報の管理について、以下を徹底します。
          </p>
          <h3 className="sm:text-xl text-lg font-bold mb-3">
            4-1. 情報の正確性の確保
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed">
            訪問者からご提供いただいた情報については、常に正確かつ最新の情報となるよう努めます。
          </p>
          <h3 className="sm:text-xl text-lg font-bold mb-3">
            4-2. 安全管理措置
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、個人情報の漏えいや滅失又は棄損を防止するために、適切なセキリュティ対策を実施して個人情報を保護します。
          </p>
          <h3 className="sm:text-xl text-lg font-bold mb-3">
            4-3. 個人情報の廃棄
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed">
            個人情報が不要となった場合には、すみやかに廃棄します。
          </p>
          <h3 className="sm:text-xl text-lg font-bold mb-3">
            4-4. 個人情報の開示、訂正、追加、削除、利用停止
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed">
            訪問者ご本人からの個人情報の開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
            <br />
            <br />
            上記を希望される場合は、
            <a
              href="https://muchimemo.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              お問い合わせフォーム
            </a>
            よりご連絡ください。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            5．個人情報の第三者への提供について
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、訪問者からご提供いただいた個人情報を、訪問者本人の同意を得ることなく第三者に提供することはありません。また、今後第三者提供を行うことになった場合には、提供する情報と提供目的などを提示し、訪問者から同意を得た場合のみ第三者提供を行います。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            6．未成年の個人情報について
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            未成年者が当サイトのお問い合わせフォームから問い合わせをされたりする場合は必ず親権者の同意を得るものとし、コメントやお問い合わせをされた時点で、当プライバシーポリシーに対して親権者の同意があるものとみなします。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            7．お問い合わせ先
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイト、又は個人情報の取扱いに関しては、お問い合わせフォームよりご連絡ください。{" "}
            <br />
            <br />
            当サイト運営者：ジーナ <br />
            連絡先：
            <a
              href="https://muchimemo.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              お問い合わせフォーム
            </a>
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            8．アクセス解析ツールについて
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
            <br />
            <br />
            このGoogleアナリティクスはアクセス情報の収集のためにCookieを使用しています。このアクセス情報は匿名で収集されており、個人を特定するものではありません。
            <br />
            <br />
            GoogleアナリティクスのCookieは、26ヶ月間保持されます。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            <br />
            <br />
            Googleアナリティクスの利用規約に関して確認したい場合は、
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              ここをクリック
            </a>
            してください。また、「ユーザーが Google
            パートナーのサイトやアプリを使用する際の Google
            によるデータ使用」に関して確認したい場合は、
            <a
              href="https://policies.google.com/technologies/partner-sites?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              ここをクリック
            </a>
            してください。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            9．第三者配信の広告サービスについて
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、第三者配信の広告サービス「Google
            Adsense（グーグルアドセンス）」を利用しています。
            <br />
            <br />
            Googleなどの第三者広告配信事業者は、訪問者の興味に応じた広告を表示するために、Cookie（当サイトの訪問者が当サイトや他のサイトにアクセスした際の情報など）を使用することがあります。
            <br />
            <br />
            訪問者は、広告設定で訪問者に合わせた広告（以下、「パーソナライズド広告」とします。）を無効にすることが出来ます。その設定をする場合は、
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              こちらをクリック
            </a>
            してください。また、
            <a
              href="http://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              www.aboutads.info
            </a>
            にアクセスすれば、パーソナライズド広告に使われる第三者配信事業者の
            Cookie を無効にできます。
            <br />
            <br />
            第三者配信による広告掲載を無効にしていない場合は、第三者配信事業者や広告ネットワークの配信する広告がサイトに掲載されることがあります。
            <br />
            <br />
            Googleによって広告の第三者配信が認められている広告配信事業者の詳細は、
            <a
              href="https://support.google.com/dfp_premium/answer/94149"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-block"
            >
              ここをクリック
            </a>
            してください。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            10．Amazonの広告配信について
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
            <br />
            <br />
            第三者（Amazonや他の広告掲載者）がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したり、認識したりする場合があります。
          </p>
          <h2 className="sm:text-2xl text-xl font-bold mb-3">
            11．プライバシーポリシーの変更について
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed">
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            <br />
            <br />
            2021年9月14日 策定
          </p>
        </div>
      </article>
    </Layout>
  );
}

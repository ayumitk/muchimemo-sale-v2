import React, { Fragment } from "react";

const ShowSaleEnds = (props: { remainingDays: number; className: string }) => {
  const { remainingDays, className } = props;

  let showRemainingDays;
  if (remainingDays === 1) {
    showRemainingDays = (
      <p className="text-white font-bold bg-red-600 px-2 py-1 inline-block mb-2 text-sm rounded-sm">
        本日、セール最終日です！
      </p>
    );
  } else if (remainingDays > 1) {
    showRemainingDays = (
      <p className="text-red-600 font-bold bg-red-200 px-2 py-1 inline-block mb-2 text-sm rounded-sm">
        セール終了まであと{remainingDays}日！
      </p>
    );
  } else {
    showRemainingDays = (
      <p className="font-bold bg-gray-300 px-2 py-1 inline-block mb-2 text-sm rounded-sm">
        このセールは終了しました
      </p>
    );
  }

  return (
    <>
      <Fragment>
        <div className={className}>{showRemainingDays}</div>
      </Fragment>
    </>
  );
};

export default ShowSaleEnds;

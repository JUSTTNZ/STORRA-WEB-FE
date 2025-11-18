import React from "react";
import { Link } from "react-router-dom";

const TransactionPageCard = ({ array, className, imgSrc, cat = true }) => {
  return (
    <>
      {array.map((item, i) => (
        <Link to="/" key={i} className={className}>
          <img src={`${imgSrc}/${item?.image}`} alt="" className="w-[44px]" />
          <h1 className="text-[24px] text-black">{item?.title}</h1>
          <p className="text-[14px]">{item?.desc}</p>

          {cat && (
            <>
                <div
                  className="absolute top-1 right-1.5 bg-[#2d5aff1e] rounded-lg p-1 text-[12px] text-[#2D5BFF]"
                >
                  {item?.category}
                </div>
            </>
          )}
        </Link>
      ))}
    </>
  );
};

export default TransactionPageCard;

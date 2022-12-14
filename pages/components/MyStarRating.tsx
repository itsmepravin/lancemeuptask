import Image from "next/image";

import { FC } from "react";

type TStarProps = {
  rating: {
    rate: number;
    count: number;
  };
};

const MyStarRating: FC<TStarProps> = ({ rating }) => {
  return (
    <div className="position-relative d-flex justify-content-center align-items-center mx-2">
      <div className="d-flex mt-2 gap-2 position-absolute top-0 start-0">
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            src="/img/star.png"
            width={13}
            height={13}
            alt=""
          />
        ))}
      </div>
      <div className="d-flex mt-2 gap-2 position-absolute top-0 start-0">
        {Array.from({ length: rating?.rate }).map((_, index) => (
          <Image
            key={index}
            src="/img/goldStar.png"
            width={13}
            height={13}
            alt=""
          />
        ))}
      </div>

      <p
        style={{ marginLeft: "5rem", marginTop: "2px" }}
        className="text-black-50"
      >
        ({rating?.count} Reviews)
      </p>
    </div>
  );
};

export default MyStarRating;

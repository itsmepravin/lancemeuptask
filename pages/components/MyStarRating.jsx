const MyStarRating = ({ product }) => {
  const itemRating = Math.floor(product.rating.rate);
  return (
    <div className="position-relative d-flex justify-content-center align-items-center mx-2">
      <div className="d-flex mt-2 gap-2 position-absolute top-0 start-0">
        {[...Array(5)].map((_, index) => (
          <img key={index} src="/img/star.png" width={13} height={13} />
        ))}
      </div>
      <div className="d-flex mt-2 gap-2 position-absolute top-0 start-0">
        {[...Array(itemRating)].map((_, index) => (
          <img key={index} src="/img/goldStar.png" width={13} height={13} />
        ))}
      </div>

      <p
        style={{ marginLeft: "5rem", marginTop: "2px" }}
        className="text-black-50"
      >
        ({product?.rating?.count} Reviews)
      </p>
    </div>
  );
};

export default MyStarRating;

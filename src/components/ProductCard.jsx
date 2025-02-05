import React from 'react';

const ProductCard = ({ title, thumbnail, description }) => {
  return (
    <div className="border p-4 rounded-lg shadow">
      <p className="font-semibold">{title}</p>
      <div className="flex justify-center items-center">
        <img
          src={thumbnail}
          alt={title}
          className="w-32 h-32 object-cover mt-2"
        />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ProductCard;


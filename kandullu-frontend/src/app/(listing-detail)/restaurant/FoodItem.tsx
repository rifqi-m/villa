import React from "react";

interface FoodItemProps {
  image: string;
  title: string;
  description: string;
  price: number;
  foodType: string;
}

const FoodItem: React.FC<FoodItemProps> = ({
  image,
  title,
  description,
  price,
  foodType,
}) => {
  return (
    <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
      <span className="bg-primary-500 border border-primary-500 rounded-full text-white text-sm  px-4 py-1 inline-block mb-4">
        {foodType}
      </span>
      <img
        className="w-64 h-64 mx-auto transform transition duration-300 hover:scale-105"
        src={image}
        alt={title}
      />
      <div className="flex flex-col items-center my-3 space-y-2">
        <h1 className="text-gray-900 poppins text-lg">{title}</h1>
        <p className="text-gray-500 poppins text-sm text-center">
          {description.slice(0, 50)}
        </p>
        <h2 className="text-gray-900 poppins text-2xl font-bold">${price}</h2>
      </div>
    </div>
  );
};

export default FoodItem;

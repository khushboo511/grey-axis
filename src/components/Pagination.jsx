import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const App = () => {
  const { data, error, isLoading, lastPage } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: 3,
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-blue-800 font-semibold mb-5 text-center">Products List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <p className="font-semibold">{product.title}</p>
            <div className="flex justify-center items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-32 h-32 object-cover mt-2"
              />
            </div>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

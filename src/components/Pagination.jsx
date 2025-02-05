// import React from "react";
// import { useQuery } from "@tanstack/react-query";

// const fetchProducts = async ({pageParam = 1}) => {
//   const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(pageParam - 1) * 10}`);
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };


// const App = () => {
//   const { data, error, isLoading, lastPage } = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//     retry: 3,
//     getNextPageParam: (lastPage, pages) => pages.length,
//   });

//   if (isLoading) return <p>Loading products...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl text-blue-800 font-semibold mb-5 text-center">Products List</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.products.map((product) => (
//           <div key={product.id} className="border p-4 rounded-lg shadow">
//             <p className="font-semibold">{product.title}</p>
//             <div className="flex justify-center items-center">
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="w-32 h-32 object-cover mt-2"
//               />
//             </div>
//             <p>{product.description}</p>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default App;


// PAGINATION

import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { data } from "autoprefixer";

const fetchProducts = async ({ pageParam = 2 }) => {
  const response = await fetch(`https://dummyjson.com/products?limit=500`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PAGE_SIZE = 12;

const App = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.products.length > 0 ? pages.length + 1 : undefined;
    },
  });

  const [currentPage, setCurrentPage] = useState(0);

  console.log('paginated data', data)

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.pages.flatMap((page) => page.products);
  console.log("PRODUCTS", products)

  const totalProducts = products.length;
  console.log("products length", totalProducts);
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  console.log("no of pages", noOfPages);

  const start = currentPage + PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  }

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-blue-800 font-semibold mb-5 text-center">
        Products List
      </h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> */}
      {/* {data.pages.map((page) =>
          page.products.map((product) => (
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
          ))
        )} */}

      <div className="flex flex-cols justify-center items-center flex-wrap">
        <button disabled={currentPage === 0} onClick={() => handlePrev()}>◀️</button>
        <div className="flex justify-center">{[...Array(noOfPages).keys()].map((n) => (
          <span
            onClick={() => { handlePageChange(n) }}
            className={`border p-2 rounded-lg shadow m-1 cursor-pointer ${n === currentPage ? "bg-blue-500" : ""
              }`}
            key={n}>{n}</span>
        ))}</div>
        <button disabled={currentPage === noOfPages-1} onClick={() => handleNext()}>▶️</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {data.pages.map((page) =>
            page.products.map((product) => (
              <ProductCard
                key={product.id}
                thumbnail={product.thumbnail}
                description={product.description}
                title={product.title}
              />
            ))
          )} */}

        {
          products.slice(start, end).map((product) => (
            <ProductCard
              key={product.id}
              thumbnail={product.thumbnail}
              description={product.description}
              title={product.title} />
          ))
        }
      </div>
      {/* </div> */}

      {/* LOAD MORE BUTTON */}
      {/* {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Load More
          </button>
        </div> */}
      {/* )} */}
    </div>
  );
};

export default App;

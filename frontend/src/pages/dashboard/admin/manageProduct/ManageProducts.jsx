import { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/features/products/productsApi";
import Loading from "../../../../components/Loading";
import { Link } from "react-router";

function ManageProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [deleteProduct] = useDeleteProductMutation();

  const {
    data: productsData = {},
    error,
    isLoading,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  });

  if (isLoading) return <Loading />;

  if (error) return <div>Failed to fetch product data</div>;

  const { products, totalProducts, totalPages } = productsData?.data || {};

  // console.log(products);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      alert("Product deleted successfully!");
      await refetch();
    } catch (error) {
      console.error("Failed to delete the product post:", error);
    }
  };

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Products
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/shop">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </div>
              </div>
              <h3 className="text-sm my-4">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                products
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Product name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Publishing date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 cursor-pointer hover:text-primary">
                          <Link to={`/shop/${product?._id}`}>
                            {product?.name}
                          </Link>
                        </th>

                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {new Date(product?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Link
                            to={`/dashboard/update-product/${product?._id}`}
                            className="hover:text-blue-700"
                          >
                            <span className="flex gap-1 items-center justify-center">
                              Edit
                            </span>
                          </Link>
                        </td>
                        <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="bg-red-600 text-white px-2 py-1"
                            onClick={() => handleDelete(product?._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}

export default ManageProducts;

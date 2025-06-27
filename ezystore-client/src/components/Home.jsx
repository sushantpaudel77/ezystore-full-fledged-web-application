import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const products = useLoaderData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-gradient-to-b from-[--color-normalbg] to-white dark:from-[--color-darkbg] dark:to-gray-900 transition-colors duration-300">
      <PageHeading title="Explore Ezy Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListings products={products} />
    </div>
  );
};

export default Home;

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.errormessage ||
        "Failed to fetch products. Please try again.",
      { status: error.status || 500 }
    );
  }
}

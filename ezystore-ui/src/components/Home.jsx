import products from "../data/products";
import EzyButton from "../EzyButton";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <EzyButton>Home</EzyButton>
      <div className="home-container">
        <PageHeading title="Explore Eazy Stickers!">
          Add a touch of creativity to your space with our wide range of fun and
          unique stickers. Perfect for any occasion!
        </PageHeading>
        <ProductListings products={products} />
      </div>
    </>
  );
}

import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <h1 style={{ textAlign: 'center', margin: '1rem' }}>Bienvenidos a nuestra tienda online</h1>
      <ItemList products={products} />
      <Footer />
    </>
  );
};

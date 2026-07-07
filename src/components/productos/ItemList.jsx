import { Link } from "react-router-dom";
import styles from "./ItemList.module.css";
import React, { useState } from "react";

export const ItemList = ({ products = [] }) => {
  return (
    <div className={styles.product}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <h2 className={styles.title}>{product.title}</h2>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.productImage}
          />
          <p className={styles.price}>Precio: ${product.price}</p>
          <Link to={`/products/${product.id}`} className={styles.detailLink}>
            Ver Detalles
          </Link>
        </div>
      ))}
    </div>
  );
};

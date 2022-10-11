import React from "react"
import { Link } from "react-router-dom"

import { ReactComponent as AddToCart } from "assets/add_to_cart.svg"
import styles from "./Styles.module.scss"

const ProductCard = ({ product }) => {
  console.log(product)
  return (
    <div className={styles.block}>
      <Link to={`/product/${product.slug}/${product.id}`}>
        <div className={styles.imgLink}>
          <img src={product.images[0].src} alt="" />
        </div>
      </Link>
      <section className={styles.info}>
        <p>{product.stock_status}</p>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{product.price}:-</p>
        <button className={styles.cta}>
          <AddToCart />
        </button>
      </section>
    </div>
  )
}

export default ProductCard

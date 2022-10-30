import React, { useContext } from "react"
import cn from "classnames"
import { CartContext } from "providers/CartProvider"
import { Link } from "react-router-dom"
import { addToCart } from "utils/cart"
import { getCartItems } from "api/cart"
import Skeleton from "react-loading-skeleton"

import { ReactComponent as AddToCart } from "assets/add_to_cart.svg"
import styles from "./Styles.module.scss"

const ProductCard = ({ product }) => {
  const { data, setData } = useContext(CartContext)

  const fetchData = async () => {
    try {
      const res = await getCartItems()
      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: res,
      }))
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
    }
  }

  const addItemToCart = async ({ product }) => {
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    try {
      await addToCart({ product })
      fetchData()
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
      console.log("ERROR: ", e)
    }
  }

  console.log(product)

  return (
    <div className={styles.block}>
      <Link to={`/product/${product.slug}/${product.id}`}>
        <div className={styles.imgLink}>
          <img src={product.images[0]?.src} alt="" />
        </div>
      </Link>
      <section className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        {product.stock_status === "instock" && (
          <p className={styles.productStatus}>tillgänglig</p>
        )}
        {product.stock_status === "outofstock" && (
          <p className={styles.productStatus}>ej tillgänglig</p>
        )}
        <div
          className={styles.price}
          dangerouslySetInnerHTML={{ __html: product.price_html }}
        />
        <button
          className={cn(styles.cta, { [styles.loading]: data.loading })}
          onClick={() => !data.loading && addItemToCart({ product: product })}
        >
          <AddToCart />
        </button>
      </section>
    </div>
  )
}

export default ProductCard

export const DummyCard = () => {
  return (
    <div className={cn(styles.block, styles.dummyBlock)}>
      <div>
        <div className={styles.imgLink}>
          <Skeleton width={300} height={300} />
        </div>
      </div>
      <section className={styles.info}>
        <Skeleton width={100} />
        <Skeleton width={250} count={3} />
      </section>
    </div>
  )
}

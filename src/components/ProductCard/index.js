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

  const addItemToCart = async ({ productID }) => {
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    try {
      await addToCart({ productID })
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

  return (
    <div className={styles.block}>
      <div className={styles.imgLink}>
        <Link to={`/product/${product.slug}/${product.id}`}>
          <img src={product.images[0]?.src} alt={product.name} />
        </Link>
      </div>
      {product.stock_status === "outofstock" && (
        <span className={styles.productStatusUnAvailable}>Tillfäligt slut</span>
      )}
      <p className={styles.name}>{product.name}</p>
      <div
        className={styles.shortDescription}
        dangerouslySetInnerHTML={{ __html: product.short_description }}
      />
      <div
        className={styles.price}
        dangerouslySetInnerHTML={{ __html: product.price_html }}
      />
      <button
        className={cn(styles.cta, { [styles.loading]: data.loading })}
        onClick={() =>
          !data.loading && addItemToCart({ productID: product.id ?? 0 })
        }
      >
        {!data.loading ? (
          <AddToCart />
        ) : (
          <div
            className={cn(styles.loadingSpinner, {
              [styles.loadingSpinnerActive]: data.loading,
            })}
          />
        )}
      </button>
      <section className={styles.attributesSection}>
        {product &&
          product.attributes &&
          product.attributes.length > 0 &&
          product.attributes.map((attr, i) => (
            <React.Fragment key={`${attr.name}-${i}`}>
              <h4>{attr.name}</h4>
              <article>
                {attr.options.map((item, i) => (
                  <span key={`${item}-${i}`}>{item}</span>
                ))}
              </article>
            </React.Fragment>
          ))}
      </section>
    </div>
  )
}

export default ProductCard

export const DummyCard = () => {
  return (
    <div className={cn(styles.block, styles.dummyBlock)}>
      <div className={styles.imgLink}></div>
      <section className={styles.info}>
        <Skeleton width={100} />
        <Skeleton width={150} count={3} />
      </section>
    </div>
  )
}

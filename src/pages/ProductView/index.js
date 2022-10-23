import React, { useContext, useState } from "react"
import cn from "classnames"
import { CartContext } from "providers/CartProvider"

import { useParams } from "react-router-dom"
import { GetProduct } from "providers/ProductsProvider"
import { addToCart } from "utils/cart"
import { getCartItems } from "api/cart"

import Skeleton from "react-loading-skeleton"
import ProductOptions from "./ProductOptions/index"
import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import Button from "components/Button"
import Gallery from "pages/ProductView/Gallery/index"
import styles from "./Styles.module.scss"
import "react-loading-skeleton/dist/skeleton.css"

import { ReactComponent as AddToCart } from "assets/add_to_cart.svg"

const ProductsView = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const data = GetProduct({ id })
  const product = !data.loading && data.data ? data.data : null
  const { setData } = useContext(CartContext)

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

  const addItemToCart = async () => {
    setLoading(true)
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    try {
      await addToCart({ product })
      fetchData()
      setLoading(false)
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
      console.log(e)
    }
  }

  return (
    <Wrapper additionalClass={styles.product}>
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs
          links={[
            { title: "Alla produkter", link: "/alla-produkter" },
            {
              title: product && product.name ? product.name : "",
              link: `/${product && product.slug ? product.slug : ""}`,
            },
          ]}
        />
      </div>
      {product ? (
        <>
          <div className={styles.productGallery}>
            <Gallery images={product.images} />
          </div>
          <div className={styles.productContainer}>
            <section className={styles.productInfo}>
              <h1>{product.name}</h1>
              <div
                className={styles.productInfoDescription}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
              <p className={styles.price}>{product.price} :-</p>
            </section>
            {product.attributes &&
              product.attributes.length > 0 &&
              product.attributes.map((attribute) => (
                <section
                  key={attribute.name}
                  className={styles.productAttributes}
                >
                  <ProductOptions attribute={attribute} />
                </section>
              ))}
            <section className={styles.addToCart}>
              <Button
                text={"Lägg i varukorgen"}
                btnClass={cn(styles.addToCartBtn, {
                  [styles.addingToCart]: loading,
                })}
                iconRight={<AddToCart />}
                onClick={() => !loading && addItemToCart()}
              />
            </section>
            <section className={styles.productStatus}>
              <p className={styles.status}>{product.stock_status}</p>
              <p className={styles.shipping}>
                <strong>Beräknad leveranstid:</strong> 3-5 arbetsdagar
              </p>
            </section>
          </div>
        </>
      ) : (
        <div
          className={cn(
            styles.productContainer,
            styles.productContainerLoading
          )}
        >
          <section className={styles.productInfo}>
            <Skeleton width={140} style={{ marginBottom: 14 }} />
            <br />
            <Skeleton width={350} style={{ marginBlockEnd: 5 }} count={4} />
            <br />
            <Skeleton width={60} style={{ marginBottom: 14 }} />
          </section>
        </div>
      )}
    </Wrapper>
  )
}

export default ProductsView

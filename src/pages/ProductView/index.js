import React, { useContext, useState } from "react"
import cn from "classnames"
import { CartContext } from "providers/CartProvider"
import { Helmet } from "react-helmet"

import { Link, useParams } from "react-router-dom"
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
import { ReactComponent as ArrowDown } from "assets/arrow-down.svg"

import "react-loading-skeleton/dist/skeleton.css"

import { ReactComponent as AddToCart } from "assets/add_to_cart.svg"

const ProductsView = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
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

  console.log({ product, open })

  return (
    <Wrapper additionalClass={styles.product}>
      <Helmet title={product?.name ?? "Elbilsprylar"} />
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
            <div
              className={styles.fullDescription}
              onClick={() => setOpen(!open)}
            >
              <section className={styles.descriptionContainerHead}>
                <h4>Product beskrivning</h4>
                {console.log(product.categories, product.categories.length)}
                <ArrowDown
                  className={cn(styles.arrowDown, {
                    [styles.arrowUp]: open,
                  })}
                />
              </section>
              <section
                className={cn(styles.descriptionContainer, {
                  [styles.descriptionContainerOpen]: open,
                })}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
          <div className={styles.productContainer}>
            <section className={styles.productInfo}>
              <h1>{product.name}</h1>
              {product.categories && product.categories.length > 0 && (
                <section className={styles.categoriesLinks}>
                  {product.categories.map((category) => (
                    <Link to={`/categories/${category.slug}`}>
                      {category.name}
                    </Link>
                  ))}
                </section>
              )}
              <div
                className={styles.productInfoDescription}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
              {console.log(product)}
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
            <div
              className={styles.fullDescriptionMobile}
              onClick={() => setOpen(!open)}
            >
              <section className={styles.descriptionContainerHead}>
                <h4>Product beskrivning</h4>
                <ArrowDown
                  className={cn(styles.arrowDown, {
                    [styles.arrowUp]: open,
                  })}
                />
              </section>
              <section
                className={cn(styles.descriptionContainer, {
                  [styles.descriptionContainerOpen]: open,
                })}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
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

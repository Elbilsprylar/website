import React from "react"
import { useParams } from "react-router-dom"
import { GetProduct } from "providers/ProductsProvider"

import { Spinner } from "react-spinner-animated"
import ProductOptions from "./ProductOptions/index"
import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import Button from "components/Button"
import Gallery from "pages/ProductView/Gallery/index"
import styles from "./Styles.module.scss"

import { ReactComponent as AddToCart } from "assets/add_to_cart.svg"

const ProductsView = () => {
  const { id } = useParams()
  const data = GetProduct({ id })
  const product = !data.loading && data.data ? data.data : null
  console.log("----", data, product)

  return (
    <Wrapper additionalClass={styles.product}>
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs
          links={[
            { title: "Alla produkter", link: "/alla-produkter" },
            { title: "produkter", link: "/all-products/product" },
          ]}
        />
      </div>
      {product ? (
        <>
          <div className={styles.ProductGallery}>
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
                text="Lägg i varukorgen"
                btnClass={styles.addToCartBtn}
                iconRight={<AddToCart />}
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
        <div className={styles.spinner}>
          <Spinner
            text={"Loading..."}
            center={false}
            width={"100px"}
            height={"100px"}
          />
        </div>
      )}
    </Wrapper>
  )
}

export default ProductsView

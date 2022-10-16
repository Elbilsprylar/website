import React from "react"
import {
  GetAllProducts,
  GetProductsCategories,
} from "providers/ProductsProvider"
import { Spinner } from "react-spinner-animated"
import "react-spinner-animated/dist/index.css"

import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import ProductCard from "components/ProductCard"

import styles from "./Styles.module.scss"

const ProductsView = () => {
  const productsData = GetAllProducts()
  const productsCategoriesData = GetProductsCategories()

  return (
    <Wrapper additionalClass={styles.products}>
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs
          links={[
            { title: "Alla produkter", link: "/categories/alla-produkter" },
          ]}
        />
      </div>
      <article>
        <h1>Alla produkter</h1>
        <p>50 produkter hittades</p>
      </article>

      {productsData &&
      !productsData.loading &&
      productsData.data &&
      productsData.data.length > 0 ? (
        <div className={styles.productsContainer}>
          {productsData.data.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
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

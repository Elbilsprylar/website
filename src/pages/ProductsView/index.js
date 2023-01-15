import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "providers/ProductsProvider"
import { Helmet } from "react-helmet"
import { DummyCard } from "components/ProductCard"
import FilterBar from "components/FilterBar"
import "react-loading-skeleton/dist/skeleton.css"

import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import ProductCard from "components/ProductCard"

import styles from "./Styles.module.scss"

const ProductsView = () => {
  const { data: productsData, setCategoryID } = useContext(ProductsContext)

  useEffect(() => {
    setCategoryID(null)
  }, [setCategoryID])

  return (
    <Wrapper additionalClass={styles.products}>
      <div className={styles.container}>
        <Helmet title={"Alla produkter"} />
        <div className={styles.breadcrumbsWrapper}>
          <Breadcrumbs
            links={[{ title: "Alla produkter", link: "/alla-produkter" }]}
          />
        </div>
        <article>
          <h1>Alla produkter</h1>
        </article>

        <FilterBar />

        {productsData && !productsData.loading ? (
          <>
            {productsData.data && productsData.data.length > 0 ? (
              <div className={styles.productsContainer}>
                {productsData.data.map((product, i) => (
                  <ProductCard key={`${product.name}-${i}`} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.noProductsContainer}>
                <p>Inga produkter att visa . . .</p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.productsContainer}>
            {["prod0", "prod1", "prod2", "prod3"].map((prod, i) => (
              <>
                <DummyCard key={`${prod}-${i}`} />
              </>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default ProductsView

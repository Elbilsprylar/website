import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "providers/ProductsProvider"
import { Helmet } from "react-helmet"
import { DummyCard } from "components/ProductCard"
import "react-loading-skeleton/dist/skeleton.css"

import Wrapper from "components/Wrapper"
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
        {productsData && !productsData.loading ? (
          <>
            {productsData.data && productsData.data.length > 0 ? (
              <div className={styles.productsContainer}>
                {productsData.data.map((product, i) => (
                  <ProductCard
                    key={`${product.name}-${product.id}-${i}`}
                    product={product}
                  />
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
        <p className={styles.footNote}>
          Hej, Du behöver inte scrolla mer.
          <br /> Detta är allt vi har med det behövs inte mer för att bli en
          mästare på att ge trygghet och närhet till dina lilla. Med andra ord
          att bli en Haugnaut.
        </p>
      </div>
    </Wrapper>
  )
}

export default ProductsView

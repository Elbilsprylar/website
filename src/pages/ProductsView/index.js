import React from "react"
import { GetAllProducts } from "providers/ProductsProvider"
import { DummyCard } from "components/ProductCard"
import "react-loading-skeleton/dist/skeleton.css"

import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import ProductCard from "components/ProductCard"

import styles from "./Styles.module.scss"

const ProductsView = () => {
  const productsData = GetAllProducts()

  return (
    <Wrapper additionalClass={styles.products}>
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs
          links={[{ title: "Alla produkter", link: "/alla-produkter" }]}
        />
      </div>
      <article>
        <h1>Alla produkter</h1>
        <p>50 produkter hittades</p>
      </article>

      {productsData && !productsData.loading ? (
        <>
          {productsData.data && productsData.data.length > 0 ? (
            <div className={styles.productsContainer}>
              {productsData.data.map((product, i) => (
                <ProductCard key={i} product={product} />
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
          {[...new Array(4)].map((elem) => (
            <DummyCard />
          ))}
        </div>
      )}
    </Wrapper>
  )
}

export default ProductsView

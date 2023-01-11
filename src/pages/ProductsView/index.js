import React, { useContext } from "react"
import { ProductsContext } from "providers/ProductsProvider"
import { DummyCard } from "components/ProductCard"
import { Helmet } from "react-helmet"
import "react-loading-skeleton/dist/skeleton.css"

import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import ProductCard from "components/ProductCard"

import styles from "./Styles.module.scss"

const ProductsView = () => {
  const { data: productsData } = useContext(ProductsContext)

  return (
    <Wrapper additionalClass={styles.products}>
      <Helmet title={"Alla produkter"} />
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs
          links={[{ title: "Alla produkter", link: "/alla-produkter" }]}
        />
      </div>
      <article>
        <h1>Alla produkter</h1>
      </article>

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
              {console.log(`${prod}-${i}`)}
              <DummyCard key={`${prod}-${i}`} />
            </>
          ))}
        </div>
      )}
    </Wrapper>
  )
}

export default ProductsView

import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "providers/ProductsProvider"
import { DummyCard } from "components/ProductCard"
import { Helmet } from "react-helmet"
import "react-loading-skeleton/dist/skeleton.css"

import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import ProductCard from "components/ProductCard"

import styles from "./Styles.module.scss"

const ProductsView = () => {
  const {
    data: productsData,
    setFilter,
    setMaxPrice,
    maxPrice,
  } = useContext(ProductsContext)
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice)
  const filterValues = [
    { name: "Nyheter", order: "desc", orderby: "date" },
    { name: "Billigast först", order: "asc", orderby: "price" },
    { name: "Dyrast först", order: "desc", orderby: "price" },
    { name: "Populärast", order: "desc", orderby: "popularity" },
  ]

  // useEffect(() => {
  //   setTimeout(() => setFilter({ order: "desc", orderby: "price" }), 6000)
  //   setTimeout(() => setMaxPrice("1000"), 13000)
  // }, [])

  const handelFilterChange = (val) => {
    filterValues.map((filter) => {
      if (filter.name === val) {
        return setFilter({ order: filter.order, orderby: filter.orderby })
      } else {
        return null
      }
    })
  }

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

        <div className={styles.filterMenu}>
          <section>
            <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(parseInt(e.target.value))}
              onMouseUp={(e) => setMaxPrice(e.target.value)}
              onTouchEnd={(e) => setMaxPrice(e.target.value)}
              class={styles.slider}
            />
            <span>{tempMaxPrice}</span>
          </section>
          <section>
            <p>Sortera på: </p>
            <select onChange={(e) => handelFilterChange(e.target.value)}>
              {filterValues.map((filter) => (
                <option key={filter.name} value={filter.name}>
                  {filter.name}
                </option>
              ))}
            </select>
          </section>
        </div>

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

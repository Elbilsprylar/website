import React, { useContext, useEffect } from "react"
import { useParams, Redirect } from "react-router-dom"
import { Helmet } from "react-helmet"
import { CategoriesContext } from "providers/CategoriesProvider"
import { GetPageCMS } from "providers/PageProvider"
import {
  ProductsContext,
  ProductsCategoriesContext,
} from "providers/ProductsProvider"

import Wrapper from "components/Wrapper"
import ProductCard from "components/ProductCard"
import Breadcrumbs from "components/Breadcrumbs"
import { DummyCard } from "components/ProductCard"
import FilterBar from "components/FilterBar"
import Skeleton from "react-loading-skeleton"

import styles from "./Styles.module.scss"

const Categories = () => {
  const { route } = useParams()
  const { data: headerCategories } = useContext(CategoriesContext)
  const { data: productsCategoriesData } = useContext(ProductsCategoriesContext)
  const { data: productsData, setCategoryID } = useContext(ProductsContext)

  const currentProductsCategory =
    productsCategoriesData &&
    productsCategoriesData.data &&
    productsCategoriesData.data.length > 0 &&
    productsCategoriesData.data.find((category) => category.slug === route)

  const list =
    headerCategories &&
    !headerCategories.loading &&
    headerCategories.data &&
    headerCategories.data.headerMenuItems &&
    headerCategories.data.headerMenuItems.length > 0
      ? headerCategories.data.headerMenuItems
      : []
  const currentCategory = list.find((category) =>
    category.pageSlug.includes(route)
  )
  const currentCategoryData = GetPageCMS(
    currentCategory && currentCategory.pageID && currentCategory.pageID
  )

  useEffect(() => {
    if (currentProductsCategory) {
      setCategoryID(currentProductsCategory.id)
    }
  }, [currentProductsCategory, setCategoryID])

  if (!headerCategories.loading && !currentCategory) {
    return <Redirect to="/not-found" />
  }

  return (
    <Wrapper additionalClass={styles.categories}>
      <Helmet title={currentCategory?.title ?? "Elbilsprylar"} />
      <div className={styles.container}>
        {currentCategory && (
          <div className={styles.breadcrumbsWrapper}>
            <Breadcrumbs
              links={[
                {
                  title: currentCategory.title,
                  link: `/categories/${currentCategory.pageSlug}`,
                },
              ]}
            />
          </div>
        )}
        <div className={styles.descriptionContainer}>
          {!currentCategoryData.loading && currentCategoryData.data ? (
            <>
              {currentCategoryData.data.title &&
                currentCategoryData.data.title.rendered && (
                  <h1>{currentCategoryData.data.title.rendered}</h1>
                )}
              {currentCategoryData.data.content &&
                currentCategoryData.data.content.rendered && (
                  <div
                    className={styles.descriptions}
                    dangerouslySetInnerHTML={{
                      __html: currentCategoryData.data.content.rendered,
                    }}
                  />
                )}
            </>
          ) : (
            <div className={styles.dummyTitle}>
              <Skeleton width={100} style={{ marginBottom: 14 }} />
              <Skeleton width={350} style={{ marginBlockEnd: 5 }} count={2} />
            </div>
          )}
        </div>

        <FilterBar />

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
      </div>
    </Wrapper>
  )
}

export default Categories

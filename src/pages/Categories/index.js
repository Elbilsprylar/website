import React, { useEffect } from "react"
import { useParams, Redirect } from "react-router-dom"
import { GetCategoriesCMS } from "providers/CategoriesProvider"
import { GetPageCMS } from "providers/PageProvider"

import Wrapper from "components/Wrapper"
import Breadcrumbs from "components/Breadcrumbs"
import styles from "./Styles.module.scss"

const Categories = () => {
  const { route } = useParams()
  const headerCategories = GetCategoriesCMS()
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
  let currentCategoryData = GetPageCMS(
    currentCategory && currentCategory.pageID && currentCategory.pageID
  )

  // useEffect(() => {
  //   if (currentCategory && currentCategory.pageID) {
  //     console.log(currentCategory, currentCategory.pageID)
  //     currentCategoryData = GetPageCMS(currentCategory.pageID)
  //   }
  // }, [currentCategory])

  useEffect(() => {
    console.log("asdasd---", currentCategoryData)
  }, [currentCategoryData])

  if (!headerCategories.loading && !currentCategory) {
    return <Redirect to="/not-found" />
  }

  return (
    <Wrapper additionalClass={styles.categories}>
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
      <article>
        {currentCategory && !headerCategories.loading && (
          <h1>{currentCategory.title}</h1>
        )}
        {/* <p>50 produkter hittades</p> */}
      </article>
    </Wrapper>
  )
}

export default Categories

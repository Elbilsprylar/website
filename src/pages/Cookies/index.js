import React from "react"
import { GetPageCMS } from "providers/PageProvider"
import Wrapper from "components/Wrapper"
import Skeleton from "react-loading-skeleton"
import styles from "./Styles.module.scss"

const Cookies = () => {
  const data = GetPageCMS(193)
  const pageData = data && !data.loading && data.data && data.data
  console.log(pageData)

  return (
    <Wrapper additionalClass={styles.wrapper}>
      {pageData && pageData.title && <h1>{pageData.title.rendered}</h1>}
      {pageData && pageData.content ? (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
        />
      ) : (
        <div>
          <Skeleton width={100} />
          <br />
          <Skeleton
            width={500}
            count={4}
            style={{ marginTop: 10, width: "100%" }}
          />
        </div>
      )}
    </Wrapper>
  )
}
export default Cookies

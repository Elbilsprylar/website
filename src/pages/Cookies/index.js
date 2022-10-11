import React from "react"
import { GetPageCMS } from "providers/PageProvider"
import Wrapper from "components/Wrapper"
import { Spinner } from "react-spinner-animated"

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
export default Cookies

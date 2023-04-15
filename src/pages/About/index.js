import React from "react"
import Wrapper from "components/Wrapper"
import Skeleton from "react-loading-skeleton"
import styles from "./Styles.module.scss"
import { GetPageCMS } from "providers/PageProvider"

const About = () => {
  const data = GetPageCMS(198)
  const pageData = data && !data.loading && data.data && data.data

  return (
    <Wrapper additionalClass={styles.about}>
      {pageData && pageData.title && <h1>{pageData.title.rendered}</h1>}
      {pageData && pageData.content ? (
        <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
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

export default About

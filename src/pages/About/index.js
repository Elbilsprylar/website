import React from "react"
import Wrapper from "components/Wrapper"
import styles from "./Styles.module.scss"
import { GetPageCMS } from "providers/PageProvider"

const About = () => {
  const data = GetPageCMS(198)
  const pageData = data && !data.loading && data.data && data.data

  return (
    <Wrapper className="about">
      {pageData && pageData.title && <h1>{pageData.title.rendered}</h1>}
      {pageData && pageData.content ? (
        <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
      ) : (
        <p>loading . . .</p>
      )}
    </Wrapper>
  )
}

export default About

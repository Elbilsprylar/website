import React, { useEffect, useState } from "react"
import Wrapper from "components/Wrapper"
import styles from "./Styles.module.scss"
import { GetHomeData } from "providers/HomeDataProvider"

const Home = () => {
  const homeData = GetHomeData()

  return (
    <Wrapper additionalClass={styles.home}>
      <div className={styles.homeHero}>
        <blockquote>
          För en enklare elbilism och ett hållbart sverige
        </blockquote>
        {/* {content && (
          <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
        )} */}
        {/* {homeData && !homeData.loading && homeData.data &&
          heroSection
        } */}
      </div>
    </Wrapper>
  )
}

export default Home

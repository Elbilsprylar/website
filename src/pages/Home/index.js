import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { HomeContext } from "providers/HomeDataProvider"
import { PopularProductsContext } from "providers/ProductsProvider"
import { PostsContext } from "providers/PostsProvider"

// import TrustBox from "components/Trustpilot"
import Wrapper from "components/Wrapper"
import ProductCard, { DummyCard } from "components/ProductCard"
import styles from "./Styles.module.scss"

const Home = () => {
  const { data } = useContext(HomeContext)
  const { data: posts_data } = useContext(PostsContext)
  const { data: productsData } = useContext(PopularProductsContext)
  const homeHeroData =
    data && !data.loading && data.data && data.data.heroSection
      ? data.data.heroSection
      : {}
  const heroImg =
    homeHeroData && homeHeroData.heroImgURL && homeHeroData.heroImgURL

  const infoList = [
    {
      title: "Förbättrad andning & syresättning",
      text: "Vår bärtub kan med hjälp av hud-mot-hud-kontakt leda till stabilare andningsfrekvens, ökad syresättning av blodet och minskad risk för andningsproblem hos nyfödda",
    },
    {
      title: "Rörelsefrihet för Mammor & Pappor",
      text: "Håll ditt barn nära samtidigt som du har händerna fria att utföra dina sysslor.",
    },
    {
      title: "Rapande och pruttande barn mår bättre",
      text: "Vår bärtub underlättar naturlig gaspassage och bidra till att minska obehag i magen, vilket leder till en mer nöjd bebis.",
    },
  ]

  return (
    <Wrapper additionalClass={styles.home}>
      <div
        className={styles.homeHero}
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        {homeHeroData && homeHeroData.heroTitle && homeHeroData.heroTitle && (
          <blockquote>{homeHeroData.heroTitle}</blockquote>
        )}
      </div>
      <div className={styles.container}>
        <section className={styles.infoBox}>
          {infoList.map((info) => (
            <div className={styles.box}>
              <h3>{info.title}</h3>
              <p>{info.text}</p>
            </div>
          ))}
        </section>
        <div className={styles.postsContainer}>
          <div className={styles.posts}>
            {posts_data &&
              posts_data.data &&
              posts_data.data.map((item, i) => (
                <div
                  key={`${item.title?.rendered}-${i}`}
                  className={styles.post}
                >
                  <span>nyhet</span>
                  <h3>{item.title?.rendered ?? "Reklam"}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.content?.rendered }}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.popProducts}>
          {productsData && !productsData.loading ? (
            <>
              {productsData.data && productsData.data.length > 0 ? (
                <div className={styles.productsContainer}>
                  {productsData.data.slice(0, 4).map((product, i) => (
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
              {[...new Array(4)].map((i) => (
                <DummyCard key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default Home

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
      {/* <TrustBox /> */}
      <div className={styles.container}>
        <div className={styles.popProducts}>
          <article className={styles.productHeader}>
            <h2>Populärt just nu</h2>
            <Link to="/alla-produkter" className={styles.productHeaderLink}>
              se alla {">"}
            </Link>
          </article>
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
      </div>
    </Wrapper>
  )
}

export default Home

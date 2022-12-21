import React, { useContext } from "react"
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
        <blockquote>
          {homeHeroData && homeHeroData.heroTitle && homeHeroData.heroTitle}
        </blockquote>
      </div>
      {/* <TrustBox /> */}
      <div className={styles.popProducts}>
        <h2>Populärt just nu</h2>
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
            {[...new Array(4)].map(() => (
              <DummyCard />
            ))}
          </div>
        )}
      </div>
      <div>
        {posts_data &&
          posts_data.data &&
          posts_data.data.map((item) => (
            <div>
              <h3>{item.title?.rendered ?? "Test"}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: item.excerpt?.rendered }}
              />
            </div>
          ))}
      </div>
    </Wrapper>
  )
}

export default Home

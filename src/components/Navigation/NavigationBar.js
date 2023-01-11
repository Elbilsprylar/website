import React, { useEffect, useState } from "react"
import cn from "classnames"
import { Link, useLocation } from "react-router-dom"
import { GetCategoriesCMS } from "providers/CategoriesProvider"
import { useScrollPosition } from "hooks/useScrollPosition"
import ProductsSearch from "./ProductsSearchComponent"
import styles from "./Styles.module.scss"

import { CartButton } from "components/CartButton"
import { ReactComponent as CartIcon } from "assets/cart-icon.svg"
import { ReactComponent as TelIcon } from "assets/tel.svg"
import { ReactComponent as ArrowDown } from "assets/arrow-down.svg"
import { ReactComponent as Logo } from "assets/logo.svg"
import { ReactComponent as MenuIcon } from "assets/menu.svg"
import { ReactComponent as CloseIcon } from "assets/close.svg"

const NavigationBar = () => {
  const location = useLocation()
  const headerCategories = GetCategoriesCMS()
  const list =
    headerCategories &&
    !headerCategories.loading &&
    headerCategories.data &&
    headerCategories.data.headerMenuItems &&
    headerCategories.data.headerMenuItems.length > 0
      ? headerCategories.data.headerMenuItems
      : []
  const [telMenuOpen, setTelMenuOpen] = useState(false)
  const [mobileMenuShown, setMobileMenuShown] = useState(false)
  const [mobileCategoriesShow, setMobileCategoriesShow] = useState(false)
  const mobileNavItems = [
    { link: "/about-us", title: "Om oss" },
    { link: "/q-and-a", title: "Vanliga frågor" },
    { link: "/contact-us", title: "Kontakta oss" },
    { link: "/terms", title: "Terms" },
    { link: "/cookies", title: "Cookies" },
    { link: "/privacy-policy", title: "Privacy policy" },
  ]

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const scrollOffset = useScrollPosition()

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return (
    <>
      <nav
        className={cn(
          styles.appNav,
          scrollOffset > 100 && !mobileMenuShown && styles.appNavShown
        )}
      >
        <div className={styles.upperBar}>
          <div
            className={cn(styles.upperBar__item, styles.telTimes)}
            onMouseEnter={() => setTelMenuOpen(true)}
            onMouseLeave={() => setTelMenuOpen(false)}
          >
            <TelIcon />
            <p>Telefontid kl 09 - 17</p>
            <ArrowDown
              className={cn(styles.arrowDown, telMenuOpen && styles.arrowUp)}
            />
            <div
              className={cn(styles.telContainer, {
                [styles.telContainerShown]: telMenuOpen,
              })}
            >
              <section className={styles.telContainer__product}>
                <h4>Produktrådgivning</h4>
                <p>
                  Alla Dagar 08-19 <br /> Vi hjälper dig med:
                </p>
                <ul>
                  <li>Leveransfrågor</li>
                  <li>Reklamationsfrågor</li>
                </ul>
                <a href="tel:0046712344567">071 234 4567</a>
              </section>
              <section className={styles.telContainer__costumerService}>
                <h4>Kundservice</h4>
                <p>
                  Vardagar 08-15 <br /> Vi hjälper dig med:
                </p>
                <ul>
                  <li>Produktfrågor</li>
                  <li>Nya Beställningar</li>
                </ul>
                <a href="tel:0046712344567">071 234 4567</a>
              </section>
            </div>
          </div>
          <div className={cn(styles.upperBar__item, styles.storeTxt)}>
            <p>Störst i norden på laddkablar</p>
          </div>
        </div>
        {windowSize.innerWidth > 1000 ? (
          <>
            <div className={styles.topSection}>
              <Link to="/">
                <Logo />
              </Link>
              <ProductsSearch />
              <CartButton />
            </div>

            <div className={styles.bottomSection}>
              <ul>
                <Link
                  to={`/alla-produkter`}
                  className={cn({
                    [styles.activeLink]:
                      location.pathname.includes("alla-produkter"),
                  })}
                >
                  Alla produkter
                </Link>
                {list.length > 0
                  ? list.map((route) => (
                      <Link
                        key={route.title}
                        to={`/categories/${route.pageSlug}`}
                        className={cn({
                          [styles.activeLink]: location.pathname.includes(
                            route.pageSlug
                          ),
                        })}
                      >
                        {route.title}
                      </Link>
                    ))
                  : null}
              </ul>
            </div>
          </>
        ) : (
          // Mobile navbar
          <div className={styles.mobileNave}>
            <div className={styles.topSection}>
              <MenuIcon
                className={styles.menuIcon}
                onClick={() => setMobileMenuShown(true)}
              />

              <Link to="/">
                <Logo />
              </Link>

              <CartButton />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile side menu */}

      <div
        className={cn(styles.mobileNavMenuContainer, {
          [styles.mobileNavMenuContainerShown]: mobileMenuShown,
        })}
      >
        <header>
          <CloseIcon
            className={styles.menuIcon}
            onClick={() => setMobileMenuShown(false)}
          />

          <Link to="/">
            <Logo />
          </Link>
        </header>
        <div className={styles.MenuHeader}>
          <div className={styles.bottomSectionSearch}>
            <ProductsSearch />
          </div>
        </div>
        <aside className={styles.mobileNavMenu}>
          <div
            className={styles.mobileNavMenuItem}
            onClick={() => setMobileCategoriesShow(!mobileCategoriesShow)}
          >
            <p>Kategorier</p>
            <ArrowDown
              className={cn(
                styles.arrowDown,
                mobileCategoriesShow && styles.arrowUp
              )}
            />
          </div>

          <div
            className={cn(styles.mobileNavCategories, {
              [styles.mobileNavCategoriesShown]: mobileCategoriesShow,
            })}
          >
            {list.map((route) => (
              <Link
                key={route.title}
                to={`/categories/${route.pageSlug}`}
                onClick={() => setMobileMenuShown(false)}
              >
                {route.title}
              </Link>
            ))}
          </div>
          {mobileNavItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              onClick={() => setMobileMenuShown(false)}
              className={styles.mobileNavMenuItem}
            >
              {item.title}
            </Link>
          ))}
        </aside>
      </div>
    </>
  )
}

export default NavigationBar

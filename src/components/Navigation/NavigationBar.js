import React, { useEffect, useState } from "react"
import cn from "classnames"
import { Link, useLocation } from "react-router-dom"
import { GetCategoriesCMS } from "providers/CategoriesProvider"
import styles from "./Styles.module.scss"

import { CartButton } from "components/CartButton"
import { ReactComponent as TelIcon } from "assets/tel.svg"
import { ReactComponent as ArrowDown } from "assets/arrow-down.svg"
import { ReactComponent as Logo } from "assets/logo_cropped.svg"
import { ReactComponent as MenuIcon } from "assets/menu.svg"
import { ReactComponent as CloseIcon } from "assets/close.svg"
import { ReactComponent as Insta } from "assets/instaFooter.svg"
import { GetFooterData } from "providers/FooterProvider"

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
  const data = GetFooterData()
  const infoLinks =
    data && !data.loading && data.data && data.data.footerMenuItems.length > 0
      ? data.data.footerMenuItems
      : []

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <nav
        className={cn(
          styles.appNav,
          !showNavbar && !mobileMenuShown && styles.appNavShown
        )}
      >
        <div className={styles.upperBar}>
          <div
            className={cn(styles.upperBar__item, styles.telTimes)}
            onMouseEnter={() => setTelMenuOpen(true)}
            onMouseLeave={() => setTelMenuOpen(false)}
          >
            <a
              href="https://www.instagram.com/hugnaut/"
              rel="noreferrer"
              target="_blank"
            >
              <Insta />
              <p>#iamhugnaut</p>
              <p>@hugnaut</p>
            </a>
          </div>
          <div className={cn(styles.upperBar__item, styles.storeTxt)}>
            <p>Fri frakt inom Sverige</p>
          </div>
        </div>
        {windowSize.innerWidth > 1000 ? (
          <>
            <div className={styles.topSection}>
              <Link to="/" className={styles.topSectionLogo}>
                <Logo />
              </Link>
              <div className={styles.linksSection}>
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
                  {infoLinks.length > 0
                    ? infoLinks.map((route) => (
                        <Link
                          key={route.title}
                          to={`/${route.pageSlug}`}
                          className={cn({
                            [styles.activeLink]:
                              location.pathname.split("/")[1] ===
                              route.pageSlug,
                          })}
                        >
                          {route.title}
                        </Link>
                      ))
                    : null}
                </ul>
              </div>
              <CartButton />
            </div>
          </>
        ) : (
          // Mobile navbar
          <div className={styles.mobileNav}>
            <div className={styles.topSection}>
              <MenuIcon
                className={styles.menuIcon}
                onClick={() => setMobileMenuShown(true)}
              />

              <Link className={styles.logoLink} to="/">
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
        <aside className={styles.mobileNavMenu}>
          <Link
            to="/alla-produkter"
            onClick={() => setMobileMenuShown(false)}
            className={styles.mobileNavMenuItem}
          >
            Alla Produkter
          </Link>

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

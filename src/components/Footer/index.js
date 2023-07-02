import React from "react"
import { GetFooterData } from "providers/FooterProvider"
import styles from "./Styles.module.scss"
// import { CategoriesContext } from "providers/CategoriesProvider"
import { GetCategoriesCMS } from "providers/CategoriesProvider"
import { Link } from "react-router-dom"

import { ReactComponent as Logo } from "assets/logoFooter.svg"
import { ReactComponent as BankId } from "assets/bankId.svg"
import { ReactComponent as MasterCard } from "assets/masterCard.svg"
import { ReactComponent as Visa } from "assets/visa.svg"
import { ReactComponent as Tel } from "assets/telFooter.svg"
import { ReactComponent as Email } from "assets/email.svg"
import { ReactComponent as Insta } from "assets/instaFooter.svg"
import { ReactComponent as FB } from "assets/fbFooter.svg"
import { ReactComponent as YT } from "assets/youtube.svg"
import { ReactComponent as FooterBg } from "assets/footerBg.svg"

const Footer = () => {
  // const list = useContext(CategoriesContext)
  const headerCategories = GetCategoriesCMS()
  const list =
    headerCategories &&
    !headerCategories.loading &&
    headerCategories.data &&
    headerCategories.data.headerMenuItems &&
    headerCategories.data.headerMenuItems.length > 0
      ? headerCategories.data.headerMenuItems
      : []
  const data = GetFooterData()
  const infoLinks =
    data && !data.loading && data.data && data.data.footerMenuItems.length > 0
      ? data.data.footerMenuItems
      : []

  const helpItems = [
    { link: "/blogg", title: "Blogg" },
    { link: "/contact-us", title: "Kontakta oss" },
    { link: "/cookies", title: "Köpevillkor" },
    { link: "/privacy-policy", title: "Integritetspolicy" },
  ]

  const InfoItems = [
    { link: "/alla-produkter", title: "Shop" },
    { link: "/contact-us", title: "Barnmorskor och BB" },
    { link: "/om-oss", title: "Om oss" },
    { link: "/vad-ar-en-haugnaut", title: "Vad är en Haugnaut" },
  ]

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerTop}>
        <section>
          <h3>Följ oss</h3>
          <ul className={styles.helpLinks}>
            {/* <li>
            <a href="mailto:info@hugnaut.com">
              <Email />
              <p>info@hugnaut.com</p>
            </a>
          </li> */}
            {/* <li>
            <a href="tel:0046712345678">
              <Tel />
              <p>071 234 5678</p>
            </a>
          </li> */}
            <li>
              <a
                href="https://www.instagram.com/hugnaut/"
                rel="noreferrer"
                target="_blank"
              >
                <Insta />
                <p>@hugnaut</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/hugnaut/"
                rel="noreferrer"
                target="_blank"
              >
                <FB />
                <p>hugnaut</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@hugnaut"
                rel="noreferrer"
                target="_blank"
              >
                <YT />
                <p>hugnaut</p>
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h3>Få hjälp</h3>
          <div className={styles.footerLinks}>
            {helpItems.map((link) => (
              <span key={link.title}>
                <Link to={`/${link.pageSlug}`}>{link.title}</Link>
              </span>
            ))}
          </div>
        </section>
        <section>
          <h3>Kategorier</h3>
          <ul className={styles.categoriesLinks}>
            {InfoItems.length > 0 &&
              InfoItems.map((route) => (
                <li key={route.title}>
                  <Link to={`/categories/${route.pageSlug}`}>
                    {route.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.paymentMethods}>
          <BankId />
          <MasterCard />
          <Visa />
        </div>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
      </div>
    </footer>
  )
}

export default Footer

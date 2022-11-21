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

  return (
    <footer className={styles.footerWrapper}>
      <section>
        <h3>Vi hjälper dig gärna</h3>
        <ul className={styles.helpLinks}>
          <li>
            <a href="mailto:info@elbilsprylar.com">
              <Email />
              <p>info@elbilsprylar.com</p>
            </a>
          </li>
          <li>
            <a href="tel:0046712345678">
              <Tel />
              <p>071 234 5678</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/elbilsprylar/"
              rel="noreferrer"
              target="_blank"
            >
              <Insta />
              <p>@elbilsprylar</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/elbilsprylar/"
              rel="noreferrer"
              target="_blank"
            >
              <FB />
              <p>elbilsprylar</p>
            </a>
          </li>
        </ul>
        <div className={styles.paymetMthd}>
          <h3 className={styles.paymentMethods}>Betalningsalternativ</h3>
          <div>
            <BankId />
            <MasterCard />
            <Visa />
          </div>
        </div>
      </section>
      <section>
        <h3>Information</h3>
        <ul className={styles.footerLinks}>
          {infoLinks.map((link) => (
            <li key={link.title}>
              <Link to={`/${link.pageSlug}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Kategorier</h3>
        <ul className={styles.categoriesLinks}>
          {list.length > 0 &&
            list.map((route) => (
              <li>
                <Link to={route.path}>{route.title}</Link>
              </li>
            ))}
        </ul>
      </section>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
    </footer>
  )
}

export default Footer

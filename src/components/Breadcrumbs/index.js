import React from "react"
import cn from "classnames"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from "./Styles.module.scss"

const Breadcrumbs = ({ links }) => {
  const location = useLocation()

  return (
    <div className={styles.wrapper}>
      <Link to="/">Hem</Link>
      <p>{">"}</p>
      {links &&
        links.length > 0 &&
        links.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <p>{">"}</p>}
            <Link
              to={item.link}
              className={cn({
                [styles.active]:
                  location.pathname === item.link ||
                  location.pathname.includes(item.link),
              })}
            >
              {item.title}
            </Link>
          </React.Fragment>
        ))}
    </div>
  )
}

export default Breadcrumbs

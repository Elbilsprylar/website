import React from "react"
import cn from "classnames"
import styles from "./Styles.module.scss"

const Wrapper = ({ children, additionalClass }) => {
  return <div className={cn(styles.wrapper, additionalClass)}>{children}</div>
}

export default Wrapper

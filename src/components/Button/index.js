import React from "react"
import cn from "classnames"
import styles from "./Styles.module.scss"

const Button = ({ text, iconRight, iconLeft, btnClass, onClick, disabled }) => {
  return (
    <button
      className={cn(styles.btn, btnClass)}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {iconLeft && iconLeft}
      {text}
      {iconRight && iconRight}
    </button>
  )
}

export default Button

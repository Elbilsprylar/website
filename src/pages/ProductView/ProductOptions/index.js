import React, { useState, useEffect } from "react"
import cn from "classnames"
import styles from "./Styles.module.scss"

const ProductOptions = ({ attribute }) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <div className={styles.optionsContainer}>
      <p>{attribute.name}</p>
      <ul className={styles.optionsList}>
        {attribute.options.map((option) => (
          <li key={option} value={option}>
            <button
              className={cn({ [styles.selected]: state === option })}
              onClick={() => setState(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductOptions

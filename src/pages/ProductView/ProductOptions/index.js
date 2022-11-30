import React, { useState, useEffect } from "react"
import cn from "classnames"
import styles from "./Styles.module.scss"

const ProductOptions = ({ attribute, variations, onChange }) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    if (state?.id) {
      onChange(state.id)
    }
  }, [state, onChange])

  return (
    <div className={styles.optionsContainer}>
      <p>{attribute.name}</p>
      <ul className={styles.optionsList}>
        {attribute.options.map((option, i) => (
          <li key={option} value={option}>
            <button
              className={cn({ [styles.selected]: state?.value === option })}
              onClick={() => setState({ value: option, id: variations[i] })}
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

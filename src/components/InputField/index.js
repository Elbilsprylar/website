import React from "react"
import styles from "./Styles.module.scss"

const CheckoutForm = ({ name, value, label, type, required }) => {
  return (
    <div className={styles.formInput}>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} required={required} />
    </div>
  )
}

export default CheckoutForm

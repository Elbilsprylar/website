import React, { useState } from "react"
import InputField from "components/InputField"

import styles from "./Styles.module.scss"
import Button from "components/Button"

const CheckoutForm = () => {
  const [state, setState] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log("e", state)
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
      >
        <div className={styles.nameSection}>
          <InputField name="firstname" label="Förnamn" type="text" required />
          <InputField name="lastname" label="Efternamn" type="text" required />
        </div>
        <InputField
          name="number"
          label="Telefonnummer"
          type="number"
          required
        />
        <InputField name="email" label="Email" type="email" required />
        <InputField name="address" label="Adress" type="text" required />
        <Button btnClass={styles.formBtn} type="submit" text="Till betalning">
          asdasd
        </Button>
      </form>
    </div>
  )
}

export default CheckoutForm

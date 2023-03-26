import React from "react"
import { useHistory } from "react-router-dom"

import Wrapper from "components/Wrapper"
import Button from "components/Button"
import { ReactComponent as SUCCESS } from "assets/success.svg"

import styles from "./Styles.module.scss"

const Completion = () => {
  const history = useHistory()

  return (
    <Wrapper additionalClass={styles.success}>
      <SUCCESS className={styles.svg} />
      <blockquote>Tack för ditt köp!</blockquote>
      <p>
        Ditt köp har slutförts, du kommer få ett e-postmeddelande med
        leveransinformation
      </p>
      <Button
        btnClass={styles.cta}
        text={"fortsätta handla "}
        onClick={() => history.push("/alla-produkter")}
      ></Button>
    </Wrapper>
  )
}

export default Completion

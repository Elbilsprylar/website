import React from "react"
import styles from "./Styles.module.scss"

import Wrapper from "components/Wrapper"
import Button from "components/Button"
import { ReactComponent as NotfoundSvg } from "assets/notfoundSvg.svg"

const NotFound = () => (
  <Wrapper className={styles.NotFound}>
    <NotfoundSvg />
    <section className={styles.content}>
      <blockquote>
        Oops . . . <br /> Något gick fel!
      </blockquote>

      <p>
        Var vänlig och kontrollera webbadressen, <br />
        eller låt oss ta dig till startsidan
      </p>
      <Button text="gå till start sidan" />
    </section>
  </Wrapper>
)

export default NotFound

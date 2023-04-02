import React from "react"
import Routes from "components/Routes/routes"
import styles from "./App.module.scss"
import CookieConsent from "components/CookieConcent"

function App() {
  return (
    <div className={styles.App}>
      <Routes />
      <CookieConsent />
      {/* TODO: add cookies bar  */}
    </div>
  )
}

export default App

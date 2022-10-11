import React from "react"
import Routes from "components/Routes/routes"
import styles from "./App.module.scss"

function App() {
  return (
    <div className={styles.App}>
      <Routes />
      {/* TODO: add cookies bar  */}
    </div>
  )
}

export default App

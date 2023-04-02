import React, { useState } from "react"
import { ReactComponent as CookieIcon } from "assets/cookieIcon.svg"
import styles from "./Styles.module.scss"

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true)

  const handleAccept = () => {
    setShowConsent(false)
    // Set a cookie to indicate that the user has given consent
    document.cookie = "cookie_consent=true; path=/"
  }

  const handleReject = () => {
    setShowConsent(false)
    // Set a cookie to indicate that the user has not given consent
    document.cookie = "cookie_consent=false; path=/"
  }

  console.log({ document: document.cookie })

  const shouldShowConsent = () => {
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith("cookie_consent=")) {
        return false
      }
    }
    return true
  }

  return (
    <>
      {showConsent && shouldShowConsent() && (
        <div className={styles.cookieConsent}>
          <CookieIcon />
          <h4>Vi skräddarsyr din upplevelse!</h4>
          <p>
            Elbilsprylar.com använder cookies för att skräddarsy din upplevelse
            och hålla vår webbplats tillförlitlig och säker. Du kan läsa mer om
            hur vi gör det här.
          </p>
          <div className={styles.ctas}>
            <button onClick={handleAccept}>Acceptera</button>
            <button onClick={handleReject}>Avvisa</button>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieConsent

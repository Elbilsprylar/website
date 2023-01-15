import React, { useEffect, useRef } from "react"

const TrustBox = () => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = useRef(null)

  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])

  // useEffect(() => console.log(ref), [ref])

  return (
    <div
      ref={ref} // We need a reference to this element to load the TrustBox in the effect.
      className="trustpilot-widget" // Renamed this to className.
      // [ long list of data attributes...]
    >
      <a
        href="https://www.trustpilot.com/review/example.com"
        target="_blank"
        rel="noreferrer"
      >
        Trustpilot
      </a>
    </div>
  )
}
export default TrustBox

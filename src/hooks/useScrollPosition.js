import { useState, useEffect } from "react"

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  let currPos = 0
  const updatePosition = () => {
    setScrollPosition(window.pageYOffset, currPos)

    if (window.pageYOffset < currPos) {
      setScrollPosition(0)
    }
    currPos = window.pageYOffset
  }

  useEffect(() => {
    window.addEventListener("scroll", updatePosition)

    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  useEffect(() => {}, [currPos, scrollPosition])

  return scrollPosition
}

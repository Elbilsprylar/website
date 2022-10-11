import React, { useState, createContext, useEffect, useContext } from "react"
import { getHomeData } from "api/homedata"

const HomeContext = createContext()

export const HomeProvider = ({ children }) => {
  const [content, setContent] = useState({
    loading: true,
    data: null,
    error: null,
  })

  return (
    <HomeContext.Provider value={{ content, setContent }}>
      {children}
    </HomeContext.Provider>
  )
}

export const GetHomeData = () => {
  const { content, setContent } = useContext(HomeContext)

  useEffect(() => saveHomeData(), [])

  const saveHomeData = async () => {
    try {
      const data = await getHomeData()
      setContent({
        loading: false,
        error: null,
        data,
      })
    } catch (e) {
      setContent({
        loading: false,
        error: `Failed to fetch Home data \nMsg: ${e}`,
        data: null,
      })
    }
  }
  return content
}

import React, { useState, createContext, useEffect } from "react"
import { getHomeData } from "api/homedata"

export const HomeContext = createContext()

export const HomeProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => saveHomeData(), [])

  const saveHomeData = async () => {
    try {
      const data = await getHomeData()
      setData({
        loading: false,
        error: null,
        data,
      })
    } catch (e) {
      setData({
        loading: false,
        error: `Failed to fetch Home data \nMsg: ${e}`,
        data: null,
      })
    }
  }

  return (
    <HomeContext.Provider value={{ data, setData }}>
      {children}
    </HomeContext.Provider>
  )
}

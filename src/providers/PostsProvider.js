import React, { useState, createContext, useEffect } from "react"
import { getPosts } from "api/homedata"

export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => saveHomeData(), [])

  const saveHomeData = async () => {
    try {
      const data = await getPosts()
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
    <PostsContext.Provider value={{ data, setData }}>
      {children}
    </PostsContext.Provider>
  )
}

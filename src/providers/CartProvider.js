import React, { useState, useEffect, useContext, createContext } from "react"
import { getCartItems } from "api/cart"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  const fetchData = async () => {
    try {
      const res = await getCartItems()
      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: res,
      }))
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
    }
  }

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    fetchData()
  }, [setData])

  return (
    <CartContext.Provider value={{ data, setData }}>
      {children}
    </CartContext.Provider>
  )
}

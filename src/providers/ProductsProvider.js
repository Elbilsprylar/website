import React, { useState, useEffect, useContext, createContext } from "react"
import { api } from "api/woocommerce_api"

const ProductsContext = createContext()
export const ProductsProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  return (
    <ProductsContext.Provider value={{ data, setData }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const GetAllProducts = () => {
  const { data, setData } = useContext(ProductsContext)

  const fetchData = async () => {
    try {
      const data = await api.get("products", { per_page: 50 })

      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: data.data,
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
  }, [])

  return data
}

// Product context Woocommerce

const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  return (
    <ProductContext.Provider value={{ data, setData }}>
      {children}
    </ProductContext.Provider>
  )
}

export const GetProduct = ({ id }) => {
  const { data, setData } = useContext(ProductContext)

  const fetchData = async () => {
    try {
      const data = await api.get(`products/${id}`)

      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: data.data,
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
  }, [])

  return data
}

// Product Categories Woocommerce

const ProductsCategoriesContext = createContext()
export const ProductsCategoriesProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  return (
    <ProductsCategoriesContext.Provider value={{ data, setData }}>
      {children}
    </ProductsCategoriesContext.Provider>
  )
}

export const GetProductsCategories = () => {
  const { data, setData } = useContext(ProductsCategoriesContext)

  const fetchData = async () => {
    try {
      const data = await api.get("products/categories")

      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: data.data,
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
  }, [])

  return data
}

// Product Categories by ID Woocommerce

const ProductsCategoriesByIDContext = createContext()
export const ProductsCategoriesByIDProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  return (
    <ProductsCategoriesByIDContext.Provider value={{ data, setData }}>
      {children}
    </ProductsCategoriesByIDContext.Provider>
  )
}

export const GetProductsCategoriesById = ({ id }) => {
  const { data, setData } = useContext(ProductsCategoriesByIDContext)

  const fetchData = async () => {
    console.log("fetching . . .")
    console.log(
      "fetching . . .222",
      "products/categories" + (id ? `/${id}` : "")
    )
    try {
      const data = await api.get(`products/categories/${id}`)

      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: data.data,
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
  }, [])

  return data
}

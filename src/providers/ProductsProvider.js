import React, { useState, useEffect, useContext, createContext } from "react"
import { api } from "api/woocommerce_api"

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

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

  return (
    <ProductsContext.Provider value={{ data, setData }}>
      {children}
    </ProductsContext.Provider>
  )
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

export const ProductsCategoriesContext = createContext()

export const ProductsCategoriesProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

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

  return (
    <ProductsCategoriesContext.Provider value={{ data, setData }}>
      {children}
    </ProductsCategoriesContext.Provider>
  )
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

  const fetchData = async (id) => {
    try {
      const data = await api.get("products", { per_page: 50, category: id })

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
    if (id) {
      setData((prevState) => ({
        ...prevState,
        loading: true,
      }))
      fetchData(id)
    }
  }, [id, setData])

  return data
}

export const PopularProductsContext = createContext()
export const PopularProductsProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  const fetchData = async () => {
    try {
      const data = await api.get("products", {
        per_page: 50,
        orderby: "popularity",
        order: "desc",
      })

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
  }, [setData])

  return (
    <PopularProductsContext.Provider value={{ data, setData }}>
      {children}
    </PopularProductsContext.Provider>
  )
}

// orderby=popularity&order=desc

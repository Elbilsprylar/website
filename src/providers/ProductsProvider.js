import React, { useState, useEffect, useContext, createContext } from "react"
import { api } from "api/woocommerce_api"

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [categoryID, setCategoryID] = useState(null)
  const [filter, setFilter] = useState(null)
  const [maxPrice, setMaxPrice] = useState(20000)
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  const fetchData = async () => {
    // console.log("products", {
    //   per_page: 100,
    //   ...(categoryID && { category: categoryID }),
    //   ...(filter && filter),
    //   ...(maxPrice > 0 && { min_price: "0", max_price: maxPrice }),
    // })

    try {
      const data = await api.get("products", {
        per_page: 100,
        ...(categoryID && { category: categoryID }),
        ...(filter && filter),
        ...(maxPrice > 0 && { min_price: "0", max_price: maxPrice }),
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
  }, [filter, maxPrice, categoryID])

  return (
    <ProductsContext.Provider
      value={{ data, setData, setFilter, maxPrice, setMaxPrice, setCategoryID }}
    >
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
  const [filter, setFilter] = useState(null)
  const [maxPrice, setMaxPrice] = useState(20000)
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })

  return (
    <ProductsCategoriesByIDContext.Provider
      value={{ data, setData, setFilter, maxPrice, setMaxPrice }}
    >
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

// Products search

export const SearchProductsContext = createContext()

export const SearchProductsProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: null,
  })
  const [searchStr, setSearchStr] = useState("")

  const fetchData = async () => {
    try {
      const data = await api.get("products", { search: searchStr })

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
    fetchData(searchStr)
  }, [searchStr])

  return (
    <SearchProductsContext.Provider
      value={{ data, setData, searchStr, setSearchStr }}
    >
      {children}
    </SearchProductsContext.Provider>
  )
}

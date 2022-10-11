import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react"
import { getHeaderCategories } from "api/homedata"

export const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  return (
    <CategoriesContext.Provider value={{ data, setData }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const GetCategoriesCMS = () => {
  const { data, setData } = useContext(CategoriesContext)

  const fetchData = useCallback(async () => {
    try {
      const data = await getHeaderCategories()

      setData((prevState) => ({
        ...prevState,
        loading: false,
        data: data,
      }))
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
    }
  }, [setData])

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    fetchData()
  }, [fetchData, setData])

  return data
}

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react"
import { getFooterLinks } from "api/homedata"

export const FooterContext = createContext()

export const FooterProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  return (
    <FooterContext.Provider value={{ data, setData }}>
      {children}
    </FooterContext.Provider>
  )
}

export const GetFooterData = () => {
  const { data, setData } = useContext(FooterContext)

  const fetchData = useCallback(async () => {
    try {
      const data = await getFooterLinks()

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

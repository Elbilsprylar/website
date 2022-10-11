import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react"
import { getPageData as fetchPageData } from "api/homedata"

const PageDataContext = createContext()

export const PageDataProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  return (
    <PageDataContext.Provider value={{ data, setData }}>
      {children}
    </PageDataContext.Provider>
  )
}

export const GetPageCMS = (pageId) => {
  const { data, setData } = useContext(PageDataContext)

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchPageData(pageId)

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
    if (pageId) {
      setData((prevState) => ({
        ...prevState,
        loading: true,
      }))
      console.log("asdasd", pageId)
      fetchData(pageId)
    }
  }, [pageId, setData, fetchData])

  return data
}

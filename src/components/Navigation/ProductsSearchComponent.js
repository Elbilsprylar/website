import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { SearchProductsContext } from "providers/ProductsProvider"

import { ReactComponent as SearchIcon } from "assets/search.svg"
import styles from "./Styles.module.scss"

const ProductsSearchComponent = () => {
  const { setSearchStr, data } = useContext(SearchProductsContext)
  const [tempStr, setTempStr] = useState("")
  const history = useHistory()
  const handelSearch = () => {
    if (tempStr.length > 0) {
      setSearchStr(tempStr)
      history.push("/sök-produkter")
    }
  }

  // const Item = ({ product }) => {
  //   return (
  //     <div className={styles.item}>
  //       <Link to={`/product/${product.slug}/${product.id}`}>
  //         <img src={product.images[0]?.src} alt={product.name} />

  //         <p className={styles.name}>{product.name}</p>
  //         <div
  //           className={styles.price}
  //           dangerouslySetInnerHTML={{ __html: product.price_html }}
  //         />
  //       </Link>
  //     </div>
  //   )
  // }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        name="search"
        value={tempStr}
        onChange={(e) => setTempStr(e.target.value)}
        onKeyUp={(e) => e.code === "Enter" && handelSearch()}
        placeholder="Sök produkt"
      />
      <button className={styles.searchBtn} onClick={() => handelSearch()}>
        <SearchIcon />
      </button>
      {/* 
      {!data.loading && data.data && data.data.length > 0 && (
        <ul className={styles.searchResultsList}>
          {data.data.map((product) => (
            <Item product={product} />
          ))}
        </ul>
      )} */}
    </div>
  )
}

export default ProductsSearchComponent

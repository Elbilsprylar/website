import React, { useState, useContext } from "react"
import { ProductsContext } from "providers/ProductsProvider"

import styles from "./Styles.module.scss"

const FilterBar = ({ context }) => {
  const { setFilter, setMaxPrice, maxPrice, setCategoryID } =
    useContext(ProductsContext)
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice)
  const filterValues = [
    { name: "Nyheter", order: "desc", orderby: "date" },
    { name: "Billigast först", order: "asc", orderby: "price" },
    { name: "Dyrast först", order: "desc", orderby: "price" },
    { name: "Populärast", order: "desc", orderby: "popularity" },
  ]

  const handelFilterChange = (val) => {
    filterValues.map((filter) => {
      if (filter.name === val) {
        setFilter({ order: filter.order, orderby: filter.orderby })
      } else {
        return null
      }
    })
  }

  return (
    <div className={styles.filterMenu}>
      {/* <section>
        <p>Max pris: </p>
        <input
          type="range"
          min="0"
          max="20000"
          step="1000"
          value={tempMaxPrice}
          onChange={(e) => setTempMaxPrice(parseInt(e.target.value))}
          onMouseUp={(e) => setMaxPrice(e.target.value)}
          onTouchEnd={(e) => setMaxPrice(e.target.value)}
          className={styles.slider}
        />
        <span>{`${tempMaxPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr`}</span>
      </section> */}
      <section className={styles.filterDropdown}>
        <p>Sortera på: </p>
        <select onChange={(e) => handelFilterChange(e.target.value)}>
          {filterValues.map((filter) => (
            <option key={filter.name} value={filter.name}>
              {filter.name}
            </option>
          ))}
        </select>
      </section>
    </div>
  )
}

export default FilterBar

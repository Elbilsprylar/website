import React, { useState, useEffect, useContext } from "react"
import calcCartData from "helpers/calculateCartData"
import { CartContext } from "providers/CartProvider"
import { useHistory } from "react-router-dom"

import Button from "components/Button"
import { ReactComponent as CartIcon } from "assets/cart-icon.svg"

import styles from "./Styles.module.scss"

export const CartButton = () => {
  const { data: cartItemsData } = useContext(CartContext)
  const [cartInfo, setCartInfo] = useState({ totalAmount: 0, totalCount: 0 })

  useEffect(() => {
    if (!cartItemsData.loading && cartItemsData.data) {
      setCartInfo(calcCartData(cartItemsData.data))
    }
  }, [cartItemsData])

  const history = useHistory()
  const IconCounter = () => {
    return (
      <>
        <p>Till kassan</p>
        <div className={styles.cartCounter}>
          <CartIcon />
          <span>
            {cartInfo && cartInfo.totalCount ? cartInfo.totalCount : 0}
          </span>
        </div>
      </>
    )
  }
  return (
    <Button
      btnClass={styles.cartBtn}
      // text="Till  kassan"
      iconRight={<IconCounter />}
      onClick={() => history.push("/checkout")}
    />
  )
}

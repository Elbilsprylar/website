import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "providers/CartProvider"
import { getCartItems } from "api/cart"
import calcCartData from "helpers/calculateCartData"
import { updateCartItem, deleteCartItem } from "utils/cart"
import { Spinner } from "react-spinner-animated"
import Wrapper from "components/Wrapper"

import styles from "./Styles.module.scss"

const CartItem = ({ product, upgradeItem, deleteItem }) => {
  const [qty, setQty] = useState(product.quantity)

  useEffect(() => {
    if (qty !== product.quantity) {
      if (qty > 0) {
        upgradeItem({
          key: product.key,
          qty,
        })
      } else {
        deleteItem({ key: product.key })
      }
    }
  }, [qty, product.quantity, product.key, upgradeItem, deleteItem])

  return (
    <div className={styles.productWrapper}>
      <div className={styles.imageContainer}>
        <img src={product.data.images[0].src} alt="" />
      </div>
      <div className={styles.productInfo}>
        <p>{product.data.name}</p>
        <p className={styles.productPrice}>
          {product.data.price + " " + product.currency}
        </p>
        <div className={styles.qtyPicker}>
          <button onClick={() => setQty(qty - 1)}>-</button>
          <p className={styles.qty}>{product.quantity}</p>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>
      <h4 className={styles.price}>
        {product.line_total + " " + product.currency}
      </h4>
    </div>
  )
}

const Checkout = () => {
  const { data: cartItemsData, setData } = useContext(CartContext)
  const [cartInfo, setCartInfo] = useState({ totalAmount: 0, totalCount: 0 })
  const shipping = 0

  useEffect(() => {
    if (!cartItemsData.loading && cartItemsData.data) {
      setCartInfo(calcCartData(cartItemsData.data))
    }
  }, [cartItemsData])

  // Cart functions

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

  const upgradeItem = async ({ key, qty }) => {
    setCartInfo({ totalAmount: 0, totalCount: 0 })
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    try {
      await updateCartItem({
        key,
        qty,
      })
      fetchData()
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
      console.log("ERROR: ", e)
    }
  }

  const deleteItem = async ({ key }) => {
    setCartInfo({ totalAmount: 0, totalCount: 0 })
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    try {
      await deleteCartItem({
        key,
      })
      fetchData()
    } catch (e) {
      setData((prevState) => ({
        ...prevState,
        loading: false,
        error: e,
      }))
      console.log("ERROR: ", e)
    }
  }

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      loading: true,
    }))
    fetchData()
  }, [])

  // Cart funcitons end

  return (
    <Wrapper additionalClass={styles.checkout}>
      <div className={styles.itemsWrapper}>
        <h1>Kassa</h1>
        {!cartItemsData.loading ? (
          <>
            {/* Cart items */}
            {cartItemsData.data && cartItemsData.data.length > 0 ? (
              cartItemsData.data.map((item) => (
                <CartItem
                  key={item.product_id}
                  product={item}
                  upgradeItem={({ key, qty }) =>
                    upgradeItem({
                      key,
                      qty,
                    })
                  }
                  deleteItem={({ key }) => deleteItem({ key })}
                />
              ))
            ) : (
              <p>No items</p>
            )}
          </>
        ) : (
          <div className={styles.spinner}>
            <Spinner
              text={"Loading..."}
              center={false}
              width={"100px"}
              height={"100px"}
            />
          </div>
        )}
        <section className={styles.summary}>
          <p>
            Antal producter: <strong>{cartInfo.totalCount ?? 0}</strong>
          </p>
          <p>
            Summa: <strong>{cartInfo.totalAmount ?? 0}kr</strong>
          </p>
          {shipping !== null && (
            <p className={styles.shipping}>
              Frakt: <strong>{shipping}kr</strong>
            </p>
          )}
          <p className={styles.totalAmount}>
            Totalbelopp: <strong>{cartInfo.totalAmount ?? 0}kr</strong>
          </p>
        </section>
      </div>
      <div className={styles.paymentWrapper}>zsdsd</div>
    </Wrapper>
  )
}

export default Checkout

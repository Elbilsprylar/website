import { getSession } from "utils/session"

export const getCartItems = async () => {
  const session = getSession() ?? ""

  try {
    const res = await fetch(
      `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/cart/items/`,
      {
        method: "GET",
        headers: {
          "X-Headless-CMS": true,
          "Content-Type": "application/json",
          "x-wc-session": session,
        },
      }
    )
    const data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}

export const deleteCartItems = async () => {
  const session = getSession() ?? ""

  try {
    const res = await fetch(
      `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/cart/items/`,
      {
        method: "DELETE",
        headers: {
          "X-Headless-CMS": true,
          "Content-Type": "application/json",
          "x-wc-session": session,
        },
      }
    )
    const data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}

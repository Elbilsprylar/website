import { storeSession, getSession } from "./session"

export const addToCart = async ({ productID }) => {
  const prodId = productID ?? 0
  const session = getSession() ?? null
  const dataToSend = {
    product_id: prodId,
  }
  const headers = {
    "X-Headless-CMS": true,
    "Content-Type": "application/json",
  }

  if (session) {
    headers["X-WC-Session"] = session
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/cart/items/`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dataToSend),
      }
    )
    const data = await res.json()
    const currentSession = res.headers.get("X-WC-Session")
    storeSession(currentSession)

    return data
  } catch (e) {
    console.log("Error in posting Cart:", e)
  }
}

export const updateCartItem = async ({ key, qty }) => {
  const session = getSession() ?? null
  const headers = {
    "X-Headless-CMS": true,
    "Content-Type": "application/json",
  }

  if (session) {
    headers["X-WC-Session"] = session
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/cart/items/${key}?quantity=${qty}`,
      {
        method: "PUT",
        headers: headers,
      }
    )
    const data = await res.json()
    const currentSession = res.headers.get("X-WC-Session")
    storeSession(currentSession)

    return data
  } catch (e) {
    console.log("Error in updating from Cart:", e)
  }
}

export const deleteCartItem = async ({ key }) => {
  const session = getSession() ?? null
  const headers = {
    "X-Headless-CMS": true,
    "Content-Type": "application/json",
  }

  if (session) {
    headers["X-WC-Session"] = session
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_WORDPRESS_PUBLIC_URL}/wp-json/rae/v1/cart/items/${key}`,
      {
        method: "DELETE",
        headers: headers,
      }
    )
    const data = await res.json()
    const currentSession = res.headers.get("X-WC-Session")
    storeSession(currentSession)

    return { res_status: 200, data: data }
  } catch (e) {
    console.log("Error in updating from Cart:", e)
  }
}

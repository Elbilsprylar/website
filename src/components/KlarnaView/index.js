import React, { useEffect } from "react"

const KlarnaView = ({ items }) => {
  const orderObj = {
    purchase_country: "GB",
    purchase_currency: "GBP",
    locale: "en-GB",
    order_amount: 50000,
    order_tax_amount: 4545,
    order_lines: [
      {
        type: "physical",
        reference: "19-402-USA",
        name: "Red T-Shirt",
        quantity: 5,
        quantity_unit: "pcs",
        unit_price: 10000,
        tax_rate: 1000,
        total_amount: 50000,
        total_discount_amount: 0,
        total_tax_amount: 4545,
      },
    ],
    merchant_urls: {
      terms: "https://www.example.com/terms.html",
      checkout:
        "https://www.example.com/checkout.html?order_id={checkout.order.id}",
      confirmation:
        "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
      push: "https://www.example.com/api/push?order_id={checkout.order.id}",
    },
  }

  // console.log("items", { items })

  useEffect(() => {
    async function fetchHtml() {
      const products = items.map((p) => {
        return { id: p.product_id, amount: p.quantity }
      })

      // console.log("products- - - -", products)

      const res = await fetch(
        // "https://elbilsprylar.wpcomstaging.com/klarna/createOrder",
        "https://api.playground.klarna.com/checkout/v3/orders",
        {
          method: "POST",
          // mode: "no-cors",
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With",
            Authorization: "Basic " + btoa("username:pass"),
          }),
          credentials: "same-origin",
          body: JSON.stringify(orderObj),
        }
      )

      // const data = await res.json()
      // setCoHtml(await htmlSnippet.data)
      // console.log(await res)
    }

    if (items && items.length > 0) {
      // console.log("Fetching . . .")
      // fetchHtml()
    }
  }, [items])

  // async function fetchHtml() {
  //   const products = cart.products.map((p) => {
  //     return { id: p.id, amount: p.amount }
  //   })
  //   console.log(products)
  //   const htmlSnippet = await axios.post("/api/klarna/createOrder", {
  //     products,
  //   })
  //   setCoHtml(await htmlSnippet.data)
  // }

  return (
    <div>
      <p>Klarna Component</p>
    </div>
  )
}

export default KlarnaView

import React, { useState, useEffect } from "react"
import axios from "axios"

const KlarnaCheckout = () => {
  const [klarna, setKlarna] = useState(null)
  const clientSecret = "WiEDCqc8zIF81jfV"
  const clientId = "K6173655_3391b54ddb69"
  const authorizationBasic = window.btoa(clientId + ":" + clientSecret)

  const getClientToken = async () => {
    try {
      const res = await axios.post(
        "https://api.klarna.com/checkout/v3/orders",
        {},
        {
          auth: {
            username: clientSecret,
            password: clientId,
          },
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
          },
        }
      )
      console.log({ res })
      return res.data.client_token
    } catch (error) {
      console.error("Error getting Klarna client token:", error)
      return null
    }
  }

  getClientToken()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://x.klarnacdn.net/kp/lib/v1/api.js"
    script.async = true
    script.onload = () => {
      console.log("load", authorizationBasic, script)
      // Initialize Klarna library
      const Klarna = window.Klarna
      Klarna.use({
        client_token: authorizationBasic,
      })
      // Initialize Klarna Checkout
      const checkout = Klarna.Payments.init({
        client_token: authorizationBasic,
        container: "klarna-checkout-container",
        payment_method_category: Klarna.Payments.methods.CATEGORY.PAY_LATER,
        purchase_country: "US",
        purchase_currency: "USD",
        locale: "en-US",
        billing_address_required: true,
        shipping_address_required: true,
        customer_email: "customer@example.com",
        customer_phone: "555-555-5555",
        order_amount: 10000,
        order_tax_amount: 2000,
        order_lines: [
          {
            type: "physical",
            reference: "123050",
            name: "Tomatoes",
            quantity: 10,
            unit_price: 600,
            tax_rate: 2500,
            total_amount: 6000,
            total_tax_amount: 1200,
          },
          {
            type: "physical",
            reference: "543670",
            name: "Bananas",
            quantity: 20,
            unit_price: 400,
            tax_rate: 2500,
            total_amount: 8000,
            total_tax_amount: 800,
          },
        ],
      })
      // Save Klarna Checkout instance to state
      setKlarna({ checkout })
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div>
      {klarna ? (
        <div id="klarna-checkout-container" />
      ) : (
        <div>Loading Klarna Checkout...</div>
      )}
    </div>
  )
}
export default KlarnaCheckout

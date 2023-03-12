import React, { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "components/CheckoutForm"
import { loadStripe } from "@stripe/stripe-js"

const PaymentElement = ({ purchasedProducts, purchaseAmount }) => {
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")
  const [email, setEmail] = useState("placeholder@email.com")
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#227dd8",
      spacingGridRow: "10px",
      spacingUnit: "5px",
    },
  }

  useEffect(() => {
    fetch(
      "https://remarkable-fudge-1aae0b.netlify.app/.netlify/functions/api/config"
    ).then(async (r) => {
      const { publishableKey } = await r.json()
      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  useEffect(() => {
    fetch(
      "https://remarkable-fudge-1aae0b.netlify.app/.netlify/functions/api/create-payment-intent",
      {
        method: "POST",
        body: JSON.stringify({
          amount: purchaseAmount,
          currency: "SEK",
          description: "Inköp av produkter",
          receipt_email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (result) => {
      var { clientSecret } = await result.json()
      setClientSecret(clientSecret)
    })
  }, [])

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance, locale: "sv" }}
        >
          <h1 style={{ marginBottom: "1rem" }}>Betala</h1>
          <CheckoutForm
            setReciptEmail={setEmail}
            purchasedProducts={purchasedProducts}
          />
        </Elements>
      )}
    </>
  )
}

export default PaymentElement

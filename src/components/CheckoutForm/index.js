import { PaymentElement, AddressElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import Button from "components/Button"
import styles from "./styles.module.scss"

const CheckoutForm = ({ setReciptEmail, purchasedProducts }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState("")
  const [addressFormValue, setAddressFormValue] = useState(null)
  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const billingDetails = {
      email: email,
      address: {
        city: addressFormValue.city,
        country: addressFormValue.country,
        line1: addressFormValue.line1,
        line2: addressFormValue.line2,
        postal_code: addressFormValue.postal_code,
        state: addressFormValue.state,
      },
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
        // receipt: {
        //   items: purchasedProducts.map((product) => ({
        //     description: product.data.name,
        //     quantity: product.quantity,
        //     amount: product.data.price,
        //     currency: "usd",
        //   })),
        // },
        payment_method_data: {
          billing_details: billingDetails,
        },
        shipping: {
          address: {
            city: addressFormValue.city,
            country: addressFormValue.country,
            line1: addressFormValue.line1,
            line2: addressFormValue.line2,
            postal_code: addressFormValue.postal_code,
            state: addressFormValue.state,
          },
          name: userName,
        },
        // mandate_data: {
        //   order_id: "asdasd",
        //   // items: JSON.stringify(
        //   //   purchasedProducts.map((product) => ({
        //   //     description: product.data.name,
        //   //     quantity: product.quantity,
        //   //     amount: product.data.price,
        //   //     currency: "usd",
        //   //   }))
        //   // ),
        // },
        // Make sure to change this to your payment completion page
        // return_url: `${window.location}/completion`,
        return_url: `https://localhost:3000/completion`,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occured.")
    }

    setIsProcessing(false)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setReciptEmail(event.target.value)
  }

  return (
    <form
      className={styles.checkoutForm}
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <label className={styles.emailInputlabel} htmlFor="email">
        Email Address
      </label>
      <input
        className={styles.emailInput}
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder={"E-postadress"}
        required
      />
      <AddressElement
        options={{
          allowedCountries: ["SE"],
          mode: "shipping",
          blockPoBox: false,
        }}
        onChange={(e) => {
          setUserName(e.value.name)
          setAddressFormValue(e.value.address)
        }}
      />
      <div className={styles.divider} />
      <PaymentElement
        id="payment-element"
        options={{
          layout: {
            type: "accordion",
            radios: true,
            spacedAccordionItems: true,
          },
        }}
      />
      <Button
        btnClass={styles.submitBtn}
        disabled={isProcessing || !stripe || !elements}
        text={isProcessing ? "Processing ... " : "Betala"}
        id="submit"
      />
      {/* Show any error or success messages */}
      {message && (
        <div className={styles.errMessage} id="payment-message">
          {message}
        </div>
      )}
    </form>
  )
}

export default CheckoutForm

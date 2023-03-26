import { PaymentElement, AddressElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import Button from "components/Button"
import styles from "./styles.module.scss"

const CheckoutForm = ({ setReciptEmail, purchasedProducts }) => {
  const history = useHistory()
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState("")
  const [addressFormValue, setAddressFormValue] = useState(null)
  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const postOrder = async ({ emailContent }) => {
    try {
      await fetch(
        "https://remarkable-fudge-1aae0b.netlify.app/.netlify/functions/api/send-email",
        {
          method: "POST",
          body: JSON.stringify({
            email: "dsoul996@gmail.com",
            html: emailContent,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (e) {
      console.log({ error: e })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
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

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: email,
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
        },
        redirect: "if_required",
      })

      if (
        error &&
        (error.type === "card_error" || error.type === "validation_error")
      ) {
        setMessage(error.message)
      } else if (paymentIntent.status === "succeeded") {
        const address = paymentIntent.shipping.address

        let productList = ""
        purchasedProducts.forEach((product) => {
          productList += `----------\n${product.data.name} - antal: ${product.quantity} - productID: ${product.product_id}\n`
        })

        const emailContent = `--- Ny Order ---\n\nPaymentID: ${
          paymentIntent.id
        }\nNamn: ${paymentIntent.shipping.name}\nEmail: ${
          paymentIntent.receipt_email
        }\nAddress: ${address.line1}, ${address.postal_code} ${address.city}\n${
          address.line2 ? `Tilläggs-adress: ${address.line2}\n` : "\n"
        }\n------------------------------------------\n\nProdukter: \n${productList}\n------------------------------------------\n\nTotal belop: ${
          paymentIntent.amount
        } SEK 
        `
        postOrder({ emailContent })
        history.push("/completion")
      } else {
        setMessage("An unexpected error occured.")
      }
    } catch (e) {
      console.log({ error: e })
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

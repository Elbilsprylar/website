import React, { useEffect } from "react"

const KlarnaView = ({ items }) => {
  const clientSecret = "WiEDCqc8zIF81jfV"
  const clientId = "K6173655_3391b54ddb69"
  const authorizationBasic = window.btoa(clientId + ":" + clientSecret)

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
    const raw = JSON.stringify({
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
        checkout: "https://www.example.com/checkout.html",
        confirmation: "https://www.example.com/confirmation.html",
        push: "https://www.example.com/api/push",
      },
    })

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Basic ${authorizationBasic}`)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    fetch("https://api.klarna.com/checkout/v3/orders", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error("error", error))
  }, [items])

  const html_snippet =
    "<div id=\"klarna-checkout-container\" style=\"overflow: hidden;\">\n  <div id=\"klarna-unsupported-page\">\n  <style type=\"text/css\">\n  @-webkit-keyframes klarnaFadeIn{from{opacity:0}to{opacity:1}}@-moz-keyframes klarnaFadeIn{from{opacity:0}to{opacity:1}}@keyframes klarnaFadeIn{from{opacity:0}to{opacity:1}}#klarna-unsupported-page{opacity:0;opacity:1\\9;-webkit-animation:klarnaFadeIn ease-in 1;-moz-animation:klarnaFadeIn ease-in 1;animation:klarnaFadeIn ease-in 1;-webkit-animation-fill-mode:forwards;-moz-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-duration:.1s;-moz-animation-duration:.1s;animation-duration:.1s;-webkit-animation-delay:5s;-moz-animation-delay:5s;animation-delay:5s;text-align:center;padding-top:64px}#klarna-unsupported-page .heading{font-family: \"Klarna Headline\", Helvetica, Arial, sans-serif;color: rgb(23, 23, 23);font-size: 36px;letter-spacing: -0.2px;-webkit-font-smoothing: antialiased;}#klarna-unsupported-page .subheading{font-family: \"Klarna Text\", \"Klarna Sans\", Helvetica, Arial, sans-serif;color: rgb(23, 23, 23);-webkit-font-smoothing: antialiased;line-height: 28px;font-weight: 400;font-size: 19px;max-width: 640px;margin: 20px auto;}#klarna-unsupported-page .reload {cursor: pointer;outline: none;-webkit-tap-highlight-color: rgba(255, 255, 255, 0);border-width: 1px;background-color: rgb(38, 37, 37);border-color: rgb(38, 37, 37);padding: 15px 24px;margin-top: 15px;color: rgb(255, 255, 255);font-family: \"Klarna Text\", \"Klarna Sans\", Helvetica, Arial, sans-serif;font-weight: 500;text-rendering: geometricprecision;font-size: 100%;}\n  </style>\n  <h1 class=\"heading\">Something went wrong</h1>\n  <p class=\"subheading\">Sorry for any inconvenience, please try reloading the checkout page or try again later.</p>\n  <p class=\"subheading\">If the problem persists it maybe be because you are using an old version of the web browser which is not safe nor compatible with modern web sites. For a smoother checkout experience, please install a newer browser.</p>\n  <button class=\"reload\" onclick=\"reloadCheckoutHandler && reloadCheckoutHandler()\">Reload checkout</button>\n  </div>\n  <script id=\"klarna-checkout-context\" type=\"text/javascript\">\n  /* <![CDATA[ */\n  var reloadCheckoutHandler;\n  (function(w,k,i,d,n,c,l){\n    w[k]=w[k]||function(){(w[k].q=w[k].q||[]).push(arguments)};\n    l=w[k].config={\n      container:w.document.getElementById(i),\n      ORDER_URL:'https://js.playground.klarna.com/eu/kco/checkout/orders/5dcfa2da-57eb-4b55-852a-282252c4d38c',\n      AUTH_HEADER:'KlarnaCheckout hne4hvfr25s1k4hku6a7',\n      IS_CANARY:false,\n      LOCALE:'en-GB',\n      ORDER_STATUS:'checkout_incomplete',\n      MERCHANT_NAME:'Your business name',\n      GUI_OPTIONS:[],\n      ALLOW_SEPARATE_SHIPPING_ADDRESS:false,\n      PURCHASE_COUNTRY:'gbr',\n      PURCHASE_CURRENCY:'GBP',\n      TESTDRIVE:true,\n      BOOTSTRAP_SRC:'https://js.playground.klarna.com/kcoc/230109-c85f1e3/checkout.bootstrap.js',\n      FE_EVENTS_DISABLED:'false',      DEVICE_RECOGNITION_URL:'https://js.playground.klarna.com/eu/kco/checkout/orders/5dcfa2da-57eb-4b55-852a-282252c4d38c/device_recognition',      DEVICE_RECOGNITION_TYPE3_ORG_ID:'87rxrdob',\n      DEVICE_RECOGNITION_TYPE3_REF:'KLRNA_87rxrdob_5dcfa2da-57eb-4b55-852a-282252c4d38c',      CLIENT_EVENT_HOST:'https://eu.playground.klarnaevt.com'\n    };\n    n=d.createElement('script');\n    c=d.getElementById(i);\n    n.async=!0;\n    n.src=l.BOOTSTRAP_SRC;\n    c.appendChild(n);\n    try{\n      ((w.Image && (new w.Image))||(d.createElement && d.createElement('img'))||{}).src =\n        l.CLIENT_EVENT_HOST + '/v1/checkout/snippet/load' +\n        '?sid=' + l.ORDER_URL.split('/').slice(-1) +\n        '&order_status=' + w.encodeURIComponent(l.ORDER_STATUS) +\n        '&timestamp=' + (new Date).getTime();\n    }catch(e){}\n    reloadCheckoutHandler = function () {\n        try{\n            ((w.Image && (new w.Image))||(d.createElement && d.createElement('img'))||{}).src =\n            l.CLIENT_EVENT_HOST+'/v1/checkout/snippet/reload?sid='+l.ORDER_URL.split('/').slice(-1)+\n            '&order_status='+w.encodeURIComponent(l.ORDER_STATUS)+'&timestamp='+(new Date()).getTime();\n            window.location.reload();\n        }catch(e){}\n    }\n  })(this,'_klarnaCheckout','klarna-checkout-container',document);\n  /* ]]> */\n  </script>\n  <noscript>\nPlease <a href=\"http://enable-javascript.com\">enable JavaScript</a>.\n  </noscript>\n</div>"

  return (
    <div>
      <p>Klarna Component</p>
      <div dangerouslySetInnerHTML={{ __html: html_snippet }} />
    </div>
  )
}

export default KlarnaView

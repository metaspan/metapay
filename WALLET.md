We are implementing **"Pay with Polkadot" Point-of-Sale** feature here:
https://github.com/metaspan/metapay

The solution is opensource and can be self-hosted by any vendor / merchant.

#### Use cases

1. Point-of-sale / Kiosk: generate QRcode with all relevant data - user scans with wallet and approves payment
`substrate://<address>:<genesisHash>:amount=1&reference=ref123`
The POS module can watch the `address` for any payment with `reference`, and mark the payment as complete.

2. Webshop: Send a link to user to request payment
`https://pay.metaspan.io/paymentRequest/<address>:<genesisHash>?amount=1&reference=ref123` (to be implemented shortly ;)
The browser will display a QRcode for wallet to scan
Also, if available, will connect to `polkadot.js` (in the browser)
An optional callback will notify the webshop that payment is done / error.

Broadly, it will embrace similar work already done at Solana Pay
https://github.com/solana-labs/solana-pay/blob/master/SPEC.md

{{Your}} Wallet should support additional fields via URL encoding in the comment

Current support - a QR code with:
`substrate:<walletid>:<genesisHash>[:<comment>]` - is supported

We need support for:
`substrate:[//]<walletid>:<genesisHash>:[?]<url-encoded-fields>`

#### Options for detecting additional fields
```js
const parts = decodedQRString.split(':')
const protocol    = parts[0]
const address     = parts[1]
const genesisHash = parts[2]
const comment     = parts[3]

// Option 1
if (address.startsWith('//')) {}

// Option 2
if (comment && comment.startsWith('?')) {}
```

#### Example handler:
```js
const parts = decodedQRString.split(':')
const protocol = parts[0]
if (protocol === 'substrate') {
  const address = parts[1]
  const comment = parts[3]
  if (address.startsWith('//') || ( comment && comment.startsWith('?') ) ) {
    // we have URL-encoded `comment` field
    /*
      [?]amount=<amount>
      &reference=<reference>
      &label=<label>
      &message=<message>
      &memo=<memo>
    */
  } else {
    // simple QR format
  }
} else {
  console.error('Invalid protocol')
}
```

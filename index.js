const cbor = require('cbor')
const cose = require('cose-js')
const pako = require('pako') // zlib
const base45 = require('base45')

/*
  Generate a base45 encoded string containing the payload and signed by the by the signer.

  Example:

      generate({name: 'tolvan'}, { p: { alg: 'ES256' }, u: { kid: '11' }}), signerKey)

*/
const generate = async (payload, headers, signer) => {

  const signed = await cose.sign.create(headers, payload, signer)
  const zip = pako.deflate(signed)
  const encoded = base45.encode(zip)
  return encoded
}

/*
  Verifies a base45 encoded signed and zipped string

*/

const verify = async (payload, verifier) => {
  const decoded = base45.decode(payload)
  const unzip = pako.inflate(decoded)
  const verified = await cose.sign.verify(unzip, verifier)
  return verified
}
/*
if (args.verify) console.log(verify(args.input))
if (args.sign) console.log(verify(args.input))

*/
module.exports = {
  generate,
  verify
}


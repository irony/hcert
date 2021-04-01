const cbor = require('cbor')
const cose = require('cose-js')
const pako = require('pako') // zlib
const base45 = require('base45')

const generate = async (payload, headers, signer) => {

  const signed = await cose.sign.create(headers, payload, signer)
  const zip = pako.deflate(signed)
  const encoded = base45.encode(zip)
  return encoded
}

const verify = async (payload, verifier) => {
  const decoded = base45.decode(payload)
  const unzip = pako.inflate(decoded)
  const verified = await cose.sign.verify(unzip, verifier)
  return verified
}

module.exports = {
  generate,
  verify
}


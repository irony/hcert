const cbor = require('cbor')
const cose = require('cose-js')
const pako = require('pako') // zlib
const base45 = require('base45')
const payload = require('./example.json')
const { encode } = require('base45')

const generate = async (payload, secret) => {
  const mappedPayload = cbor.encode(payload)
  // const mac = await cose.mac.create({ p: { alg: 'SHA-256_64' } }, mappedPayload, { key: secret })
  const zipped = pako.deflateRaw(mappedPayload)
  const encoded = base45.encode(zipped)
  return zipped.toString('base64')
}

const decode = async (payload, secret) => {
  const decoded = Buffer.from(payload, 'base64')
  try {
    const unzipped = pako.inflateRaw(decoded)
    console.log('unzipped', unzipped)
    const unmapped = cbor.decode(unzipped)
    console.log('unmapped', unmapped)
    return unmapped
  } catch (err) {
    console.error('err unzipping', err)
  }
}

module.exports = {
  generate,
  decode
}


/* eslint-disable no-undef */
const { generate, verify } = require('..')
const cbor = require('cbor')
const cose = require('cose-js')
const pako = require('pako') // zlib
const base45 = require('base45')

describe('generate', () => {
  const secret = 'very-very-secret-key'
  const payload = {
    user: { name: 'Tolvan Tolvansson' }
  }

  const signer = {
    key: {
      d: Buffer.from('6c1382765aec5358f117733d281c1c7bdc39884d04a45a1e6c67c858bc206c19', 'hex')
    }
  }

  const verifier = {
    key: {
      x: Buffer.from('143329cce7868e416927599cf65a34f3ce2ffda55a7eca69ed8919a394d42f0f', 'hex'),
      y: Buffer.from('60f7f1a780d8a783bfb7a2dd6b2796e8128dbbcef9d3d168db9529971a36e7b9', 'hex')
    }
  }

  const headers = {
    p: { alg: 'ES256' },
    u: { kid: '11' }
  }

  test('base45', () => {
    const input = signer.key.d
    const encoded = base45.encode(input)
    const decoded = base45.decode(encoded)
    expect(decoded).toEqual(input)
  })

  test('zip', async () => {
    const input = 'räksmörgås'
    const zip = pako.deflate(input)
    const unzip = pako.inflate(zip, { to: 'string' })
    expect(unzip).toEqual(input)
  })

  test('cbor', async () => {
    const mappedPayload = cbor.encode(payload)
    //
    const unmapped = cbor.decode(mappedPayload)
    expect(unmapped).toEqual(payload)
  })

  test('cose sign + verify', async () => {
    const signed = await cose.sign.create(headers, payload, signer)
    //
    const verified = await cose.sign.verify(signed, verifier)
    expect(verified).toEqual(payload)
  })

  test('cose sign + zip + unzip + verify', async () => {
    const signed = await cose.sign.create(headers, payload, signer)
    const zip = pako.deflate(signed)
    // 
    const unzip = pako.inflate(zip)
    const verified = await cose.sign.verify(unzip, verifier)
    expect(verified).toEqual(payload)
  })

  test('cose sign + zip + base45.encode + base45.decode + unzip + verify', async () => {
    const signed = await cose.sign.create(headers, payload, signer)
    const zip = pako.deflate(signed)
    const encoded = base45.encode(zip)
    // 
    const decoded = base45.decode(encoded)
    const unzip = pako.inflate(decoded)
    const verified = await cose.sign.verify(unzip, verifier)
    expect(verified).toEqual(payload)
  })

  test('encode -> qr -> decode', async () => {
    const qr = await generate(payload, signer)
    const decoded = await verify(qr, verifier)
    expect(decoded).toEqual(payload)
    console.log('result', decoded)
  })
})

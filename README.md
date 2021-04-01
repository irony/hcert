Green Health Cert Generator and Verifier Lib
===

## Introduction
This lib is a helper to be able to work with green health cert easily from Javascript

## Usage

    const {encode, verify } = require('hcert')

    const payload = { user: { name: 'Tolvan Tolvansson' } }
    const signer = { ... }
    const verifier = { ... }

    const headers = {
        p: { alg: 'ES256' },
        u: { kid: '11' }
    }
    
    const qr = await generate(payload, headers, signer)
    // 6BFOXN*TS0BI$ZD1TH-KK.QOVTQT*QO$GIGF9LNG$G MVS$CQDF 420DNK:7NQO9497WV:XM*8N%7KOCM/ZLV5QKDGVALV*T-$FGG4O3WM3NH0CF4E2C74MGU06*43I VW0V+RDNHR/SL/1UX0G0AR*-PDAU9CR$%I+-FL50/.4U1

    const decoded = await verify(qr, verifier)
    // { user: { name: 'Tolvan Tolvansson' } }

## Status

Tests working. Now we need to use correct certificates etc.

    ✓ base45 (1 ms)
    ✓ zip (5 ms)
    ✓ cbor (1 ms)
    ✓ cose sign + verify (844 ms)
    ✓ cose sign + zip + unzip + verify (361 ms)
    ✓ cose sign + zip + base45.encode + base45.decode + unzip + verify (65 ms)
    ✓ encode -> qr -> decode (13 ms)


## Get Started

    npm i
    npm run dev

## LICENSE

Apache 2.0
Christian Landgren

Green Health Cert Generator and Verifier Lib
===

## Introduction
This lib is a helper to be able to work with green health cert easily from Javascript

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

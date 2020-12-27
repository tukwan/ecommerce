const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const HDNode = require('ethers').utils.HDNode
const eUtils = require('ethers').utils
const bip39 = require('bip39')

const app = express()

app.use(
  cors({
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port
  console.log('HDWallet on:', port)
})

const pathId = 0
const mnemonic = bip39.generateMnemonic()
console.log('mnemonic:', mnemonic)

const entropy = eUtils.mnemonicToEntropy(mnemonic)
console.log('entropy:', entropy)

const seed = eUtils.mnemonicToSeed(mnemonic)
const masterNode = HDNode.fromSeed(seed)

console.log('privateKey:', masterNode.privateKey)
console.log('publicKey:', masterNode.publicKey)
console.log('chainCode:', masterNode.chainCode)
console.log('path:', masterNode.path)
const path = "m/44'/60'/0'/0/" + pathId

const addrNode = masterNode.derivePath(path)
console.log('addrNode:',addrNode)

app.get('/api/getAddress', (req, res) => {

})

http.get('http://localhost:5000/api/getAddress', function (res) {
  console.log('test')
  let data = ''

  res.on('data', function (chunk) {
    console.log('test2')
    data += chunk
  })

  res.on('end', function () {
    console.log('test3')
    console.log(data)
  })
})

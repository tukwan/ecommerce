const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const HDNode = require('ethers').utils.HDNode
const web3 = require('web3')
// const eUtils = require('ethers').utils
// const bip39 = require('bip39')

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

// const mnemonic = bip39.generateMnemonic()
const mnemonic = 'spell tube glove enroll soldier someone cattle husband lawn runway approve cabin'
console.log('mnemonic:', mnemonic)

// * Under the Hood *
// .fromMnemonic {
// mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist), wordlist);
// return HDNode._fromSeed(mnemonicToSeed(mnemonic, password)) ...
// }

const masterNode = HDNode.fromMnemonic(mnemonic)
// console.log('masterNode:', masterNode)
console.log('privateKey:', masterNode.privateKey)
console.log('publicKey:', masterNode.publicKey)

let pathId = 0

app.get('/api/getAddress', (req, res) => {
  const path = "m/44'/60'/0'/0/" + pathId
  const addrNode = masterNode.derivePath(path)

  console.log('Generated address:', addrNode.address)
  console.log('Generated checksum:', web3.utils.toChecksumAddress(addrNode.address))
  console.log('Generated path:', addrNode.path)

  const toSend = JSON.stringify({ address: addrNode.address, path: addrNode.path })
  res.send(toSend)

  pathId++
})

for (let i = 0; i < 3; i++) {
  http.get('http://localhost:5000/api/getAddress', function (res) {
    let data = ''

    res.on('data', function (chunk) {
      data += chunk
    })

    res.on('end', function () {
      // console.log(data)
    })
  })
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const bip39 = require('bip39')
const hdkey = require('hdkey')

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
console.log('BIP39 mnemonic:', mnemonic)

app.get('/api/getAddress', (req, res) => {
  const main = async () => {
    const seed = await bip39.mnemonicToSeed(mnemonic)
    console.log('seed:', seed)
    // res.send(JSON.stringify(seed))
    const root = hdkey.fromMasterSeed(seed)
    const mPrivateKey = root.privateKey.toString('hex')
    console.log('Master private key:', mPrivateKey)
    const mPublicKey = root.publicKey.toString('hex')
    console.log('Master public key:', mPublicKey)

    const path = "m/44'/60'/0'/0/" + pathId
    console.log('root:', root)
    const addrNode = root.derive(path)
    console.log('path:', path)
    console.log('addrNode:', addrNode)
  }
  main()
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

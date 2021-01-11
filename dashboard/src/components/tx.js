// TODO: remove, for testing now
// await web3.eth.sendTransaction({ from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", to: '0x24D294fc35Ed473FD5d976C71AA79f39A28Fae3F', value: web3.utils.toWei('0.4', "ether")})

/*
useEffect(() => {
  main()


  const web3ws = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
  const sub = web3ws.eth.subscribe('pendingTransactions', function (err, res) {
    if (!err) console.log(err)
  })

  const watchTransactions = () => {
    console.log('Watching all pending transactions...')

    sub.on('data', (txHash) => {
      ;(async () => {
        try {
          let tx = await library.eth.getTransaction(txHash)
          console.log('tx', tx)
          if (tx != null) {
            if (account == tx.to.toLowerCase()) {
              console.log({
                address: tx.from,
                value: library.utils.fromWei(tx.value, 'ether'),
                timestamp: new Date(),
              })
            }
          }
        } catch (err) {
          console.error(err)
        }
      })()
    })
  }

  // watchTransactions()

  return () => {
    sub.unsubscribe(function (err, succs) {
      if (succs) console.log('Successfully unsubscribed!')
    })
  }
}, [])
*/



/*
const Web3 = require('web3')

class TransactionChecker {
  web3
  web3ws
  account
  subscription

  constructor(projectId, account) {
    this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + projectId))
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId))
    this.account = account.toLowerCase()
  }

  subscribe(topic) {
    this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
      if (err) console.error(err)
    })
  }

  watchTransactions() {
    console.log('Watching all pending transactions...')
    this.subscription.on('data', (txHash) => {
      setTimeout(async () => {
        try {
          let tx = await this.web3.eth.getTransaction(txHash)
          if (tx != null) {
            if (this.account == tx.to.toLowerCase()) {
              console.log({
                address: tx.from,
                value: this.web3.utils.fromWei(tx.value, 'ether'),
                timestamp: new Date(),
              })
            }
          }
        } catch (err) {
          console.error(err)
        }
      }, 60000)
    })
  }
}

let txChecker = new TransactionChecker(process.env.INFURA_ID, '0x.....')
txChecker.subscribe('pendingTransactions')
txChecker.watchTransactions()




class TransactionChecker {
  web3
  account

  constructor(projectId, account) {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId))
    this.account = account.toLowerCase()
  }

  async checkBlock() {
    let block = await this.web3.eth.getBlock('latest')
    let number = block.number
    console.log('Searching block ' + number)

    if (block != null && block.transactions != null) {
      for (let txHash of block.transactions) {
        let tx = await this.web3.eth.getTransaction(txHash)
        if (this.account == tx.to.toLowerCase()) {
          console.log('Transaction found on block: ' + number)
          console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
        }
      }
    }
  }
}

let txChecker = new TransactionChecker(process.env.INFURA_ID, '0x....')
setInterval(() => {
  txChecker.checkBlock()
}, 15 * 1000)


const getTransactionsByAccount = async (web3, account, startBlockNumber, endBlockNumber) => {
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber()
    console.log("Using endBlockNumber: " + endBlockNumber)
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber)
  }
  console.log("Searching for transactions to/from account \"" + account + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber)

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    // if (i % 1000 == 0) {
      console.log("Searching block " + i)
    // }


    let block = await web3.eth.getBlock(i, true)
    let number = block.number

    if (block != null && block.transactions != null) {
      for (let tx of block.transactions) {
        // console.log('xt', tx)
        console.log('account:', account == tx.to)
        if (account == tx.to) {
          console.log('Transaction found on block: ' + number)
          console.log({ address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
        }
      }
    }


    // var block = await web3.eth.getBlock(i, true)
    // if (block != null && block.transactions != null) {
    //   block.transactions.forEach( function(e) {
    //     if (account == "*" || account == e.from || account == e.to) {
    //       console.log("  tx hash          : " + e.hash + "\n"
    //         + "   nonce           : " + e.nonce + "\n"
    //         + "   blockHash       : " + e.blockHash + "\n"
    //         + "   blockNumber     : " + e.blockNumber + "\n"
    //         + "   transactionIndex: " + e.transactionIndex + "\n"
    //         + "   from            : " + e.from + "\n"
    //         + "   to              : " + e.to + "\n"
    //         + "   value           : " + e.value + "\n"
    //         + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
    //         + "   gasPrice        : " + e.gasPrice + "\n"
    //         + "   gas             : " + e.gas + "\n"
    //         + "   input           : " + e.input)
    //     }
    //   })
    // }
  }



  */

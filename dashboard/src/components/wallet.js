import React, { useContext, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { utils } from 'ethers'
import moment from 'moment'

import { StoreContext } from '../store'

export const Wallet = observer((props) => {
  const store = useContext(StoreContext)
  const { library, account } = useWeb3React()
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    main()
  }, [])

  const main = async () => {
    const MNEMONIC = process.env.REACT_APP_MNEMONIC

    const masterNode = utils.HDNode.fromMnemonic(MNEMONIC)
    console.log('privateKey:', masterNode.privateKey)
    console.log('publicKey:', masterNode.publicKey)

    const accounts = []

    for (let i = 0; i < 5; i++) {
      const path = "m/44'/60'/0'/0/" + i
      const addrNode = masterNode.derivePath(path)

      console.log('Generated address:', addrNode.address)
      console.log('Generated path:', addrNode.path)

      const bal = await library.eth.getBalance(addrNode.address, 'latest')

      const balanceFormat = parseFloat(library.utils.fromWei(bal, 'ether')).toPrecision(6)
      console.log('balance: ', balanceFormat)

      if (balanceFormat > 0) {
        accounts.push(addrNode.address)
      }
    }

    console.log('accounts', accounts)

    const transactions = await getTransactionsByAccount(library, accounts[0], 0)

    console.log('txxxxx', transactions)
    setTransactions(transactions)
  }

  return (
    <div className="column is-9-desktop mt-5 p-5 is-shady">
      {transactions &&
        transactions.map((tx, i) => (
          <div key={i}>
            <div className="columns is-mobile is-vcentered">
              <div className="column">
                <div class="field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag">Block number</span>
                      <span class="tag is-link">{tx.blockNumber}</span>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag">Confirmations</span>
                      <span class="tag is-warning">{tx.confirmations} / 12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-mobile is-vcentered">
              <div className="column is-3">
                <p className="has-text-weight-bold">Tx hash:</p>
              </div>
              <div className="column">
                <p className="tag is-warning is-light">{tx.hash}</p>
              </div>
            </div>
            <div className="columns is-mobile is-vcentered">
              <div className="column is-3">
                <p className="has-text-weight-bold">HDWallet addres:</p>
              </div>
              <div className="column">
                <p className="tag is-warning is-light is-medium">{tx.to}</p>
              </div>
            </div>
            <div className="columns is-mobile is-vcentered">
              <div className="column is-3">
                <p className="has-text-weight-bold">Address from:</p>
              </div>
              <div className="column">
                <p className="tag is-warning is-light is-medium">{tx.from}</p>
              </div>
            </div>
            <div className="columns is-mobile is-vcentered">
              <div className="column is-3">
                <p className="has-text-weight-bold">ETH value:</p>
              </div>
              <div className="column">
                <p className="tag is-warning is-light is-medium">{tx.value}</p>
              </div>
            </div>
            <div className="columns is-mobile is-vcentered">
              <div className="column is-3">
                <p className="has-text-weight-bold">Date:</p>
              </div>
              <div className="column">
                <p className="tag is-warning is-light is-medium">{tx.timestamp}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
    </div>
  )
})

const getTransactionsByAccount = async (web3, account, startBlockNumber, endBlockNumber) => {
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber()
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000
  }

  let result = []

  for (let i = startBlockNumber; i <= endBlockNumber; i++) {
    console.log(`Searching block ${i} / ${endBlockNumber}`)

    let block = await web3.eth.getBlock(i, true)
    let blockNumber = block.number

    if (block != null && block.transactions != null) {
      for (let tx of block.transactions) {
        if (account == tx.to) {
          console.log('Transaction found on block: ' + blockNumber)
          const confirmations = endBlockNumber - blockNumber
          const txObj = {
            hash: tx.hash,
            to: tx.to,
            from: tx.from,
            value: web3.utils.fromWei(tx.value, 'ether'),
            timestamp: moment(block.timestamp, 'X').format('DD MM YYYY HH:mm:ss'),
            blockNumber,
            confirmations,
          }
          result.push(txObj)
        }
      }
    }
  }

  return result.reverse()
}

// await web3.eth.sendTransaction({ from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", to: '0x24D294fc35Ed473FD5d976C71AA79f39A28Fae3F', value: web3.utils.toWei('0.4', "ether")})

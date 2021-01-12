import React, { useContext, useState, useEffect } from 'react'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useWeb3React } from '@web3-react/core'
import { utils } from 'web3'
import axios from 'axios'

import { StoreContext } from '../store'
import { TimePayment } from './timePayment'

export const Payment = observer(() => {
  const { library, account } = useWeb3React()
  const store = useContext(StoreContext)
  const { ethPrice, gasPrices, activeProduct } = store
  const { img, name, price } = activeProduct
  const priceToPay = price / ethPrice

  const [paymentAddress, setPaymentAddress] = useState('0x0')
  const [txHash, setTxHash] = useState(null)
  const [txLoading, setTxLoading] = useState(false)
  const [isTimePayment, setIsTimePayment] = useState(false)

  useEffect(() => {
    getPaymentAddress()
  }, [])

  const payWithMM = async () => {
    const txData = {
      from: account,
      to: paymentAddress,
      gasPrice: utils.toWei(`${gasPrices.medium}`, 'gwei'),
      value: utils.toWei(`${priceToPay}`, 'ether'),
    }

    try {
      setTxLoading(true)
      const { transactionHash } = await library.eth.sendTransaction(txData)
      setTxHash(transactionHash)
      setTxLoading(false)
    } catch (err) {
      console.log(err)
      setTxLoading(false)
    }
  }

  const getPaymentAddress = async () => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'http://52.59.243.101' : 'http://localhost'

    try {
      const res = await axios.get(`${apiUrl}:5000/api/getAddress`)
      const { address } = res.data
      setPaymentAddress(address)
    } catch (err) {
      console.log(err)
    }
  }

  const handleBack = () => {
    runInAction(() => {
      store.activeProduct = null
    })
  }

  const payWithTime = () => {
    setIsTimePayment(!isTimePayment)
  }

  return (
    <div className="card is-shady mt-5">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={img} alt="logo" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-5">Price: {price} $</p>
          </div>
        </div>
        <div className="content">
          <div className="columns is-multiline ">
            <div className="column is-12 has-text-centered">
              <h3 className="has-text-weight-bold">ETH Payment Address:</h3>
              <span className="tag is-warning is-light is-large">{paymentAddress}</span>
            </div>
            <div className="column is-12 has-text-centered">
              <h3 className="has-text-weight-bold">Price in ETH:</h3>
              <span className="tag is-warning is-light is-large">{priceToPay}</span>
            </div>
            {gasPrices && (
              <div className="column is-12 has-text-centered">
                <h4 className="has-text-weight-bold">Current Gas Prices (gwei):</h4>
                <div className="is-flex is-justify-content-center	">
                  <div className="tags has-addons">
                    <span className="tag">Low</span>
                    <span className="tag is-info">{gasPrices.low}</span>
                  </div>
                  <div className="tags has-addons ml-4 mr-4">
                    <span className="tag">Medium</span>
                    <span className="tag is-info">{gasPrices.medium}</span>
                  </div>
                  <div className="tags has-addons mb-4">
                    <span className="tag">High</span>
                    <span className="tag is-info">{gasPrices.high}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isTimePayment && (
            <TimePayment
              paymentAddress={paymentAddress}
              priceToPay={priceToPay}
              setTxHash={setTxHash}
              setTxLoading={setTxLoading}
            />
          )}
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <a className="button is-danger" onClick={handleBack}>
                Back
              </a>
            </p>
            <p className="control">
              <a className="button is-link" onClick={payWithMM}>
                Pay with Metamask
              </a>
            </p>
            <p className="control">
              <a className="button is-link" onClick={payWithTime}>
                Pay with Transfer
              </a>
            </p>
          </div>
        </div>
        <footer className="card-footer">
          {txLoading && <progress className="progress is-small is-primary" max="100"></progress>}
          {txHash && (
            <a
              href={`https://rinkeby.etherscan.io/tx/${txHash}`}
              className="card-footer-item has-text-success has-background-success-light"
            >
              Success! Tx Hash: {txHash}
            </a>
          )}
        </footer>
      </div>
    </div>
  )
})

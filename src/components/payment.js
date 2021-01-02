import React, { useContext } from 'react'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import web3 from 'web3'

import { StoreContext } from '../store'

export const Payment = observer(() => {
  const { library, account } = useWeb3React()
  const { ethPrice, activeProduct } = useContext(StoreContext)
  const { img, name, price } = activeProduct
  const priceToPay = price / ethPrice

  const payWithMM = async () => {
    const gasPrice = await library.getGasPrice()

    console.log(gasPrice.toString())
    const params = [
      {
        from: account,
        to: '0x1Da897E2C64a273c8B6Af30966F9dE2Df65E6F10',
        gasPrice: web3.utils.toHex(gasPrice.toString()),
        value: ethers.utils.parseEther(`${priceToPay}`).toHexString(),
      },
    ]

    library.send('eth_sendTransaction', params)
    // console.log('transactionHash is ' + transactionHash)
  }

  const handleBack = () => {
    runInAction(() => {
      activeProduct = null
    })
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
              <span className="tag is-warning is-light is-large">0x14B3b82fEE9B42136019581c8C6c3DF608E93Fb9</span>
            </div>
            <div className="column is-12 has-text-centered">
              <h3 className="has-text-weight-bold">~Price in ETH:</h3>
              <span className="tag is-warning is-light is-large">{priceToPay}</span>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  )
})

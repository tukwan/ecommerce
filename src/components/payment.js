import React, { useContext } from 'react'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../store'

export const Payment = observer(() => {
  const { activeProduct } = useContext(StoreContext)
  const { img, name, price } = activeProduct
  const store = useContext(StoreContext)

  const handleBack = () => {
    runInAction(() => {
      store.activeProduct = null
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
              <h3 className="has-text-weight-bold">ETH payment address:</h3>
              <span className="tag is-warning is-light is-large">0x14B3b82fEE9B42136019581c8C6c3DF608E93Fb9</span>
            </div>
            <div className="column is-12 has-text-centered">
              <h3 className="has-text-weight-bold">Amount:</h3>
              <span className="tag is-warning is-light is-large">10 $</span>
            </div>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <a className="button is-danger" onClick={handleBack}>
                Back
              </a>
            </p>
            <p className="control">
              <a className="button is-link">Metamask Pay</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../store'

export const Product = observer((props) => {
  const store = useContext(StoreContext)
  const { img, name, price } = props.product

  const setActive = () => {
    runInAction(() => {
      store.activeProduct = props.product
    })
  }

  return (
    <div className="card is-shady pt-5">
      <div className="card-image is-flex is-justify-content-center">
        <figure className="image is-128x128">
          <img src={img} alt="item1" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://gateway.ipfs.io/ipfs/QmPXRaYH5cpoCcvenB2XY5bRYsBkefqpXgmmv4LuEukbUr" alt="logo" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-5">Price: {price} $</p>
          </div>
        </div>
        <div className="content">
          <p>
            A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one
            party to another without going through a financial institution. Digital signatures provide part of the
            solution, but the main benefits are lost if a trusted third party is still required to prevent
            double-spending. We propose a solution to the double-spending problem using a peer-to-peer network.
          </p>
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item has-text-weight-bold" onClick={setActive}>
          Buy
        </a>
      </footer>
    </div>
  )
})

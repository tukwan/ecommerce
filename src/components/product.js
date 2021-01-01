import React from 'react'
import { useWeb3React } from '@web3-react/core'

export const Product = (props) => {
  const { chainId, account } = useWeb3React()
  const [isActive, setisActive] = React.useState(false)
  const { img, name, price } = props.product

  return (
    <div className="card is-shady">
      <div className="card-image">
        <figure className="image is-16by9">
          <img src={img} alt="item1" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://gateway.ipfs.io/ipfs/QmQXg7WAvGngteWxJMS4cjoHi5uXwJjxqAoJKqnPL7kxrc" alt="logo" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-5">Price: {price} $</p>
          </div>
        </div>
        <div className="content">
          <p>
            Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque
            volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.
          </p>
          <p>
            <a href="#">Read more</a>
          </p>
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Buy
        </a>
      </footer>
    </div>
  )
}

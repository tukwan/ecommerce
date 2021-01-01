import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useObserver } from 'mobx-react-lite'

import { StoreContext } from '../store'
import { Product } from './product'

export const Container = () => {
  const { chainId, account } = useWeb3React()
  const [isActive, setisActive] = React.useState(false)
  const { products } = useContext(StoreContext)

  return useObserver(() => (
    <section className="container">
      <div className="columns">
        {products.map((product, i) => (
          <div key={i} className="column is-4">
            <Product product={product} />
          </div>
        ))}
      </div>
    </section>
  ))
}

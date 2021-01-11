import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../store'
import { Product } from './product'
import { Payment } from './payment'

export const Container = observer(() => {
  const { products, activeProduct } = useContext(StoreContext)

  const renderProducts = () => {
    return products.map((product, i) => (
      <div key={i} className="column is-4">
        <Product product={product} />
      </div>
    ))
  }

  return (
    <section className="container">
      <div className="columns is-centered mt-2">{activeProduct ? <Payment /> : renderProducts()}</div>
    </section>
  )
})

import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../store'
import { Wallet } from './wallet'

export const Container = observer(() => {
  const store = useContext(StoreContext)

  return (
    <section className="container">
      <div className="columns is-mobile is-centered">
        <Wallet />
      </div>
    </section>
  )
})

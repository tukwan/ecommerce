import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../store'

export const Wallet = observer((props) => {
  const store = useContext(StoreContext)

  return (
    <div className="column is-10">
      <div className="card is-shady">
        <div className="card-content">
          <div className="content">
            <p>
              Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim
              neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.
            </p>
            <p>
              <a href="#">Read more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

import React from 'react'
import { useWeb3React } from '@web3-react/core'

export const Container = () => {
  const { chainId, account } = useWeb3React()
  const [isActive, setisActive] = React.useState(false)

  return (
    <section className="container">
      <div className="columns">
        <div className="column">
          <div className="card is-shady">
            <div className="card-content">
              <div className="content">
                <h4>Tristique senectus et netus et. </h4>
                <p>
                  Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim
                  neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra
                  nam.
                </p>
                <p>
                  <a href="#">Learn more</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

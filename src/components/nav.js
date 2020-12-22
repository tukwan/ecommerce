import React from 'react'
import { useWeb3React } from '@web3-react/core'

export const Nav = () => {
  const { chainId, account } = useWeb3React()

  return (
    <nav className="navbar is-dark">
      {/* <input value={myContext.appState.network} onChange={handleOnChange} /> */}
      <div className="navbar-brand is-justify-content-space-between">
        <a className="navbar-item" href="/">
          <strong>
            <i className="fa fa-coins"></i> Token Wallet
          </strong>
        </a>
        <div className="navbar-item" href="/">
          <span className="is-size-7">
            Connected: <strong className="has-text-white">{account}</strong>
          </span>
        </div>
        <a className="navbar-item" href="/">
          <div className="tags has-addons">
            <span className="tag">
              <i className="fa fa-signal"></i> &nbsp; Network
            </span>
            <span className="tag is-info">{chainIdToHuman(chainId)}</span>
          </div>
        </a>
      </div>
    </nav>
  )
}

const chainIdToHuman = (chainId) => {
  let networkName
  switch (chainId) {
    case 1:
      networkName = 'mainnet'
      break
    case 3:
      networkName = 'ropsten'
      break
    case 4:
      networkName = 'rinkeby'
      break
    case 42:
      networkName = 'kovan'
      break
    case 1337:
      networkName = 'local'
      break
    default:
      networkName = 'undefined'
  }

  return networkName
}

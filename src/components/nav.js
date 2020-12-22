import React from 'react'
import { useWeb3React } from '@web3-react/core'

export const Nav = () => {
  const { chainId, account } = useWeb3React()
  const [isActive, setisActive] = React.useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <div className="tags has-addons">
              <span className="tag">
                <i className="fa fa-signal"></i> &nbsp; Network
              </span>
              <span className="tag is-dark">{chainIdToHuman(chainId)}</span>
            </div>
          </div>
          <div className="navbar-item">
            <div className="tags has-addons">
              <span className="tag">
                <i className="fa fa-user-circle"></i> &nbsp; Account
              </span>
              <span className="tag is-dark">{account}</span>
            </div>
          </div>
          <a
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            onClick={() => {
              setisActive(!isActive)
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div id="navbarMenu" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="tabs is-right">
              {/* <ul>
                <li className="is-active">
                  <a>E-Commrce</a>
                </li>
              </ul> */}
              <span className="navbar-item">
                <a className="button is-white is-outlined" href="https://github.com/deployAt">
                  <span className="icon">
                    <i className="fa fa-github"></i>
                  </span>
                  <span>View Source</span>
                </a>
              </span>
            </div>
          </div>
        </div>
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

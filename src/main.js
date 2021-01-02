import React, { useEffect } from 'react'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SWRConfig } from 'swr'
import { toJS } from 'mobx'
import Web3 from 'web3'
// import { enableLogging } from 'mobx-logger'

import { Store, StoreContext } from './store'
import { ethFetcher } from './utils/ethFetcher'
import { App } from './app'

const injectedConnector = new InjectedConnector({})

const store = new Store()
// debug store
window.s = {
  get s() {
    return toJS(store)
  },
}

export const Main = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainRun />
    </Web3ReactProvider>
  )
}

const MainRun = () => {
  const { library, account, activate, active } = useWeb3React()

  useEffect(() => {
    activate(injectedConnector)
  }, [])

  if (!active) return <h1>turn on web3</h1>

  store.init(library, account)

  return (
    <SWRConfig value={{ fetcher: ethFetcher(library, []) }}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </SWRConfig>
  )
}

const getLibrary = (provider) => {
  // const library = new ethers.providers.Web3Provider(provider)
  const library = new Web3(provider)
  // library.pollingInterval = 12000

  return library
}

import React, { useEffect } from 'react'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SWRConfig } from 'swr'
import { ethers } from 'ethers'
// import Web3 from 'web3'

import { ethFetcher } from './utils/ethFetcher'
import { App } from './app'

const injectedConnector = new InjectedConnector({})

export const Main = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainRun />
    </Web3ReactProvider>
  )
}

const MainRun = () => {
  const { library, activate, active } = useWeb3React()

  useEffect(() => {
    activate(injectedConnector)
  }, [])

  if (!active) return <div>turn on web3</div>

  return (
    <SWRConfig value={{ fetcher: ethFetcher(library, []) }}>
      <App />
    </SWRConfig>
  )
}

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  window.library = library
  // const library = new Web3(provider)
  // library.pollingInterval = 12000
  return library
}

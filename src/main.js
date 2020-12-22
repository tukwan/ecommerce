import React, { useEffect } from 'react'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import Web3 from 'web3'

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
  const { activate, active } = useWeb3React()

  useEffect(() => {
    activate(injectedConnector)
  }, [])

  if (active) return <App />

  return <div>unload</div>
}

const getLibrary = (provider) => {
  // const library = new ethers.providers.Web3Provider(provider)
  const library = new Web3(provider)
  // library.pollingInterval = 12000
  return library
}

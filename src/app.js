import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLocalStore, useObserver } from 'mobx-react-lite'

import './app.css'
import { Nav } from './components/nav'

const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    test: 'test',
  }))

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const TestStore = () => {
  const store = useContext(StoreContext)
  const { account } = useWeb3React()

  return useObserver(() => (
    <div>
      <h2>{store.test}</h2>
      <h2>{account}</h2>
    </div>
  ))
}

export const App = () => {
  // const { library, account } = useWeb3React()

  return (
    <StoreProvider>
      <Nav />
      <h1>Mobx Store</h1>
      <TestStore />
    </StoreProvider>
  )
}

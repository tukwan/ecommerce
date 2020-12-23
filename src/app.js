import React, { createContext, useContext,useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import { runInAction, makeAutoObservable,trace } from 'mobx'
import { ethers } from 'ethers'
import {enableLogging} from 'mobx-logger';

import './app.css'
import { Nav } from './components/nav'
import { Container } from './components/container'
import { useBalance } from './hooks/balance'

class Store {
  test = 'test'
  githubProjects = []
  state = 'pending' // "pending", "done" or "error"
  balance = 0

  constructor() {
    makeAutoObservable(this)
    this.getBalance()
  }

  async getBalance() {
    this.githubProjects = []
    this.state = 'lol?'
    try {
      const bm = await window.library.getBalance('0x1Da897E2C64a273c8B6Af30966F9dE2Df65E6F10', 'latest')
      runInAction(() => {
        this.balance = parseFloat(ethers.utils.formatEther(bm)).toPrecision(6)
        this.state = 'done'
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.state = 'error'
      })
    }
  }
}

export const StoreContext = createContext()

// const StoreProvider = ({ children }) => {
//   const store = useLocalStore(() => ({
//     test: 'test',
//     balanceMobx: 'loading...',

//     // async getBalance() {
//     //   const { data: balance } = useSWR(['getBalance', account, 'latest'])
//     //   return parseFloat(ethers.utils.formatEther(balance)).toPrecision(6)
//     // },

//     async getBalance() {
//       try {
//         const brm = await window.library.getBalance('0x1Da897E2C64a273c8B6Af30966F9dE2Df65E6F10', 'latest')
//         runInAction((x) => {
//           this.balanceMobx = brm.toString()
//           console.log('lol', x)
//           // this.state = "done"
//         })
//       } catch (e) {
//         runInAction(() => {
//           // this.state = "error"
//           console.log('error')
//         })
//       }
//     },
//   }))

//   return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
// }

const TestStore = () => {
  const store = useContext(StoreContext)
  // trace(true)

  useEffect(() => {
    store.getBalance()
    console.log(store.getBalance())
  }, [])

  const { account } = useWeb3React()
  const balance = useBalance()

  return useObserver(() => (
    <div>
      <h2>{store.test}</h2>
      <h2>{account}</h2>
      <h2>{balance}</h2>
      <h2>bm: {store.balance}</h2>
      <h2>state: {store.state}</h2>
    </div>
  ))
}

export const App = () => {
  // enableLogging()
  // const { library, account } = useWeb3React()
  const appStore = window.store = new Store()
  return (
    <StoreContext.Provider value={appStore}>
      <section className="hero is-dark is-bold">
        <div className="hero-head">
          <Nav />
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">E-Commerce</h1>
            {/* <h2 className="subtitle"></h2> */}
          </div>
        </div>
      </section>
      <Container />
      {/* <TestStore /> */}
    </StoreContext.Provider>
  )
}

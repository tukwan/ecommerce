import { createContext } from 'react'
import { runInAction, makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'

import MarsToken from './contracts/MarsToken.json'
import { PRODUCTS } from './data/products'

export class Store {
  library = null
  account = 0
  balance = 0
  products = PRODUCTS
  activeProduct = null
  ethPrice = 0

  constructor() {
    makeAutoObservable(this)
  }

  init(library, account) {
    this.library = library
    this.account = account
    this.getBalance()
    this.getETHPrice()
    this.loadContract()
  }

  async loadContract() {
    try {
      const contract = new ethers.Contract(MarsToken.networks[777].address, MarsToken.abi, this.library.getSigner())
      let balance = await contract.balanceOf(this.account)
      console.log(balance.toString())
    } catch (e) {
      console.log(e)
    }
  }

  async getBalance() {
    try {
      const bm = await this.library.getBalance(this.account, 'latest')
      runInAction(() => {
        this.balance = parseFloat(ethers.utils.formatEther(bm)).toPrecision(6)
      })
    } catch (e) {
      console.log(e)
    }
  }

  async getETHPrice() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      const data = await res.json()
      const {
        ethereum: { usd },
      } = data
      runInAction(() => {
        this.ethPrice = usd
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const StoreContext = createContext()

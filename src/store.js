import { createContext } from 'react'
import { runInAction, makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'

export class Store {
  library = null
  account = 0
  balance = 0

  constructor() {
    makeAutoObservable(this)
  }

  init(library, account) {
    this.library = library
    this.account = account
    this.getBalance()
  }

  async getBalance() {
    try {
      const bm = await this.library.getBalance(this.account, 'latest')
      runInAction(() => {
        this.balance = parseFloat(ethers.utils.formatEther(bm)).toPrecision(6)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export const StoreContext = createContext()

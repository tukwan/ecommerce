import { useEffect,useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import useSWR from 'swr'
import { from } from 'rxjs'

import { StoreContext } from "../app";

export const useBalance = () => {
  const { account, library } = useWeb3React()
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'])
  const store = useContext(StoreContext)


  console.log('mobx balance', store.balanceM)

  useEffect(() => {
    library.on('block', () => {
      console.log('New block -> update balance')
      mutate()
    })

    balanceRx()
    store.getBalance()
    return () => {
      library.removeAllListeners('block')
    }
  }, [])

  const balanceRx = () => {
    const brx = library.getBalance(account, 'latest')

    // console.log('balance', brx.toString())

    //emit result of promise
    const promiseSource = from(brx)
    //output: 'Hello World'
    // const subscribe = promiseSource.subscribe((val) => console.log(val.toString()))
  }

  if (!balance) return 0
  return parseFloat(ethers.utils.formatEther(balance)).toPrecision(6)
}

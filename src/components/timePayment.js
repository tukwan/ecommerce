import React, { useContext, useState, useEffect } from 'react'
import { runInAction, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useWeb3React } from '@web3-react/core'
import { utils } from 'web3'
import axios from 'axios'
import moment from 'moment'

import { StoreContext } from '../store'

export const TimePayment = observer((props) => {
  const { library, account } = useWeb3React()
  const store = useContext(StoreContext)
  const { setTxLoading } = props

  const [timer, setTimer] = useState(0)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const timeHandle = setInterval(() => {
      const newTimer = timer + 1
      setTimer(newTimer)
    }, 1000)

    return () => {
      clearInterval(timeHandle)
    }
  }, [timer])

  useEffect(() => {
    const balanceHandle = setInterval(() => {
      verify()
    }, 4000)
    setTxLoading(true)

    return () => {
      clearInterval(balanceHandle)
      setTxLoading(false)
    }
  }, [])

  const verify = async () => {
    // const balance = await library.eth.getBalance('0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6')
    // console.log('balance:', balance)
  }

  const counter = moment(15, 'm').subtract(timer, 's').format('mm:ss')
  return (
    <>
      <div className="column is-12 has-text-centered">
        <h3 className="has-text-weight-bold">Time left to receive a payment:</h3>
        <span className="tag is-warning is-light is-large">{counter}</span>
      </div>
      <div className="column is-12 has-text-centered mb-3">
        <h3 className="has-text-weight-bold">Balance in ETH:</h3>
        <span className="tag is-warning is-light is-large">{balance}</span>
      </div>
    </>
  )
})

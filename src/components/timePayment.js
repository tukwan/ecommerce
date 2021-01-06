import React, { useContext, useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useWeb3React } from '@web3-react/core'
import moment from 'moment'

import { StoreContext } from '../store'

export const TimePayment = observer((props) => {
  const { library } = useWeb3React()
  const store = useContext(StoreContext)
  const { paymentAddress, priceToPay, setTxHash, setTxLoading } = props

  const [timer, setTimer] = useState(0)
  const [isPayed, setIsPayed] = useState(false)
  const [balance, setBalance] = useState(0)

  const intervalRef = useRef(null)
  const clearTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const newTimer = timer + 1
      setTimer(newTimer)
    }, 1000)

    return () => {
      clearTimer()
    }
  }, [timer])

  useEffect(() => {
    setTxLoading(true)

    const sub = library.eth.subscribe('newBlockHeaders', function (err, res) {
      if (!err) {
        verify()
        return
      }
      console.error('err', err)
    })

    return () => {
      setTxLoading(false)
      sub.unsubscribe(function (err, succs) {
        if (succs) console.log('Successfully unsubscribed!')
      })
    }
  }, [])

  const verify = async () => {
    if (isPayed) return
    const balance = await library.eth.getBalance(paymentAddress)
    const balanceFormat = library.utils.fromWei(`${balance}`, 'ether')

    const BN = library.utils.BN

    const balanceBN = new BN(`${balance}`)

    const priceToPayWei = library.utils.toWei(`${priceToPay}`, 'ether')
    const priceToPayBN = new BN(priceToPayWei)

    const isPayedRecieved = balanceBN.gte(priceToPayBN)

    setBalance(balanceFormat)

    if (isPayedRecieved) {
      setTxLoading(false)
      setTxHash('123')
      setIsPayed(true)
      clearTimer()
      return
    }
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

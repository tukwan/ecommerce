import React from 'react'
import { useWeb3React } from '@web3-react/core'

import item1 from '../data/item1.json'
import item2 from '../data/item2.json'
import item3 from '../data/item3.json'

export const Product = () => {
  const { chainId, account } = useWeb3React()
  const [isActive, setisActive] = React.useState(false)

  return (
    <div>
      <img src={item1.img} />
      <img src={item2.img} />
      <img src={item3.img} />
    </div>
  )
}

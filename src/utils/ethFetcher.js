import { Contract } from '@ethersproject/contracts'
import { isAddress } from '@ethersproject/address'

export const ethFetcher = (library, ABIs) => (...args) => {
  const [arg1, arg2, ...params] = args

  // contract call
  if (isAddress(arg1)) {
    if (!ABIs) throw new ABIError(`ABI repo not found`)
    if (!ABIs.get) throw new ABIError(`ABI repo isn't a Map`)
    const address = arg1
    const method = arg2
    const abi = ABIs.get(address)
    if (!abi) throw new ABINotFound(`ABI not found for ${address}`)
    const contract = new Contract(address, abi, library.getSigner())
    return contract[method](...params)
  }

  // eth call
  const method = arg1
  return library[method](arg2, ...params)
}

class ABIError extends Error {
  constructor(message) {
    super(message)
  }
}
class ABINotFound extends Error {
  constructor(message) {
    super(message)
  }
}

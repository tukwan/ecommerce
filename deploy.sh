#!/usr/bin/env bash

# Deploy contracts
truffle migrate --reset --network rinkeby

# Verify Contracts on Etherscan
truffle run verify ArtNFT --network rinkeby --license SPDX-License-Identifier

# Flatten Contracts
./node_modules/.bin/truffle-flattener contracts/ArtNFT.sol > flats/ArtNFT_flat.sol

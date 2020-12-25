const MarsToken = artifacts.require('MarsToken')

module.exports = async function (deployer, _network, addresses) {
  const [user0, user1, _] = addresses

  await deployer.deploy(MarsToken)
  // const artNFT = await ArtNFT.deployed()
  // await artNFT.mint(user0, 'Mona Lisa')

}

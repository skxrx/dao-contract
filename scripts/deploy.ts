import { ethers, run } from 'hardhat'

async function main() {
  const [signer] = await ethers.getSigners()

  const minimumQuorum: number = 66
  const debatingPeriodDuration: number = 259200
  const _minimumVotes: number = 666

  const DAO_f = await ethers.getContractFactory('DAO')
  const Token = await ethers.getContractFactory('DaoToken')

  // const token = await Token.deploy()
  // await token.deployed()

  // const DAO = await DAO_f.deploy(
  //   token.address,
  //   minimumQuorum,
  //   debatingPeriodDuration,
  //   _minimumVotes
  // )
  // await DAO.deployed()

  setTimeout(async function () {
    await run(`verify:verify`, {
      address: '0x76a141eDe8BDcEc25FADfee84d7B9f69c3D228Dc',
      contract: 'contracts/ERC20Token/DaoToken.sol:DaoToken',
    })
    await run(`verify:verify`, {
      address: '0x303aB8444120DE8643aeeaB48271a72162414F30',
      contract: 'contracts/DAO.sol:DAO',
      constructorArguments: [
        '0x76a141eDe8BDcEc25FADfee84d7B9f69c3D228Dc',
        minimumQuorum,
        debatingPeriodDuration,
        _minimumVotes,
      ],
    })
  }, 5000)

  console.log(`
   
    ${signer.address} - ver this contracts
  `)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

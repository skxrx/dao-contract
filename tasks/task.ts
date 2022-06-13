import { task } from 'hardhat/config'
import { contractAddress } from '../config'

task('vote', 'Vote for the proposal ')
  .addParam('proposalId', 'The number of the proposal you are voting for')
  .addParam('answer', 'Your decision')
  .setAction(async function (taskArgs, hre) {
    const DAO = await hre.ethers.getContractAt('DAO', contractAddress)

    await DAO.vote(taskArgs.proposalId, taskArgs.answer)
  })

task('addProposal', 'Add proposal to voting')
  .addParam('targetContract', 'The contract that will perform the action')
  .addParam('signature', 'Function signature with arguments to be executed')
  .addParam('description', 'Proposal description')
  .setAction(async function (taskArgs, hre) {
    const DAO = await hre.ethers.getContractAt('DAO', contractAddress)

    await DAO.addProposal(
      taskArgs.targetContract,
      taskArgs.signature,
      taskArgs.description
    )
  })

task('finish', 'End proposal vote')
  .addParam('proposalId', 'The number of the proposal you want to end')
  .setAction(async function (taskArgs, hre) {
    const DAO = await hre.ethers.getContractAt('DAO', contractAddress)

    await DAO.finishProposal(taskArgs.proposalId)
  })

task('deposit', 'Depositing voting tokens')
  .addParam('amount', 'Number of tokens to deposit')
  .setAction(async function (taskArgs, hre) {
    const DAO = await hre.ethers.getContractAt('DAO', contractAddress)

    await DAO.deposit(taskArgs.amount)
  })

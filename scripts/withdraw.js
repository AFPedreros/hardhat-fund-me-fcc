const { deployments, ethers, getNamedAccounts } = require("hardhat")

const main = async () => {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Withdrawing...")
    const transactionResponse = await fundMe.cheaperWithdraw()
    await transactionResponse.wait(1)
    console.log("Got it back")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

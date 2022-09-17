const { network } = require("hardhat")
const {
    networkConfig,
    developmentChain,
} = require("../helper-hardhat-config.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeeAddress
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeeAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeeAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeeAddress], // put price fee address
        log: true,
    })
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "fundme"]

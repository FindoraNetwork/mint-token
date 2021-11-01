import { network, ethers } from 'hardhat';
import { Contract, ContractFactory, BigNumber, utils } from 'ethers';
import { encodeParameters, wait } from './utils';

async function main() {
    const { provider } = ethers;
    const [operator] = await ethers.getSigners();

    const estimateGasPrice = await provider.getGasPrice();
    const gasPrice = estimateGasPrice.mul(3).div(2);
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    const override = { gasPrice };

    console.log(`====================Do your bussiness =======================`)
    const WFRA = await ethers.getContractFactory("WFRA");
    console.log("Deploying WFRA...");
    let wrfa = await WFRA.deploy();
    await wrfa.deployed();
    console.log("WFRA Address is: ", wrfa.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
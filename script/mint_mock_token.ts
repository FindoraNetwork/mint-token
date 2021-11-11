import { network, ethers } from 'hardhat';
import { Contract, ContractFactory, BigNumber, utils } from 'ethers';
import { encodeParameters, wait } from './utils';
const { TOKENS } = require('./config');

async function main() {
    const { provider } = ethers;
    const [operator] = await ethers.getSigners();

    const estimateGasPrice = await provider.getGasPrice();
    const gasPrice = estimateGasPrice.mul(3).div(2);
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    const override = { gasPrice };

    console.log(`====================Do your bussiness =======================`)

    // Need to mint the address
    // 需要铸币的地址
    const mintTo = '0x71819C78cc5c33A37460eE681ef39f98bfb4e5BA';
    // The amount of coins to be minted, please change as needed
    // 需要铸币的量，请按需更改
    const initSupply =  BigNumber.from(10000);
    // The symbol that needs to be minted refers to the token existing in the config
    // 需要铸币的 symbol 请参考 config 里存在的
    // To get WFRA, please send FRA to WFRA address in your wallet
    // 要获取WFRA 请在钱包中发送FRA到WFRA地址
    const mockTokens = [
        'DAI'
      ]
    
    for (var token of mockTokens) {
        let tokenAddress = TOKENS[token][network.name];
        let MockToken = await ethers.getContractAt('MockToken', tokenAddress);
        let decimals = await MockToken.decimals();
        let mintAmount = ethers.utils.parseUnits(initSupply.toString(), decimals);
        console.log(`Token[${token}] decimals:${decimals}`)
        let tx = await MockToken.connect(operator).mint(mintTo, mintAmount);
        await wait(ethers, tx.hash,`Token[${token}] mintTo: ${mintTo} mintAmount: ${mintAmount}`);
    }

}

function deadline() {
    // 30 minutes
    return Math.floor(new Date().getTime() / 1000) + 1800;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
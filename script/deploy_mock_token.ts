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
    const MockToken = await ethers.getContractFactory('MockToken');
    
    //string memory name, uint8 decimals, uint256 initSupply
    const initSupply =  BigNumber.from(1000);
    const mockTokens = [
        // {symbol: 'USDT', decimals: 18},
        // {symbol: 'BUSD', decimals: 6},
        // {symbol: 'BTCB', decimals: 18},
        // {symbol: 'BETH', decimals: 6},
        {symbol: 'USDC', decimals: 18},
        {symbol: 'DAI', decimals: 18},
    ];

    for (var token of mockTokens) {
        let symbol = token['symbol'];
        let decimals = token['decimals'];
        let unit = ethers.utils.parseUnits(initSupply.toString(), decimals);
        let mockToken = await MockToken.connect(operator).deploy(symbol, decimals, unit, override);
        await wait(ethers,mockToken.deployTransaction.hash,
            `Deploy MockToken(${symbol}) => ${mockToken.address}`
        );
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
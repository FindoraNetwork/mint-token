## token minter
```
MNEMONIC: toss debris tool gesture trust hybrid cute sense spirit wide cave wrestle
ADDRESS: 0x38c3DbED166efA60a04019c77e28cDF1fda927b9
PRIVATE KEY: 85350adb394f8da962ec93b1c9712b55225914e2ad91a2de88b09f3b3bb07190
```

## Install Dependencies

`npm install`

## change

mint_mock_token.ts script <br/>
mintTo: Need to mint the address <br/>
initSupply: The amount of coins to be minted, please change as needed <br/>
mockTokens: The symbol that needs to be minted refers to the token existing in the config <br/>

##  mint

npx hardhat run script/mint_mock_token.ts --network dev

Currently hardhat.config only configures dev / test, which can be replaced as needed.
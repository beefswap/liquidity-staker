var Web3 = require("web3");

var BigNumber = require("bignumber.js");
var TX = require("ethereumjs-tx")

const stakingRewardsFactoryAddress = "0x77Dcfe8904d571CF05e4EedFa81C22c3cB57c444";

const tsAddress="0x1af77a32a95dc886c84604869b4b8adc8264427a";

//连接到Ganache
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var fs = require("fs");
var data = fs.readFileSync("./build/StakingRewardsFactory.json", "utf-8");


//私钥转换为Buffer
const privateKey =  Buffer.from('8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6',"hex")
//私钥转换为账号
const account = web3.eth.accounts.privateKeyToAccount("0x8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6");
//私钥对应的账号地地址
const address = account.address
console.log("address: ",address)

//创建合约对象
var contract = new web3.eth.Contract(JSON.parse(data).abi,stakingRewardsFactoryAddress);


//获取nonce,使用本地私钥发送交易
web3.eth.getTransactionCount(address).then(
    nonce => {
        // console.log("approve nonce: ",nonce)

        // const txParams = {
        //     nonce: nonce,
        //     gasLimit: web3.utils.toHex(8000000),
        //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        //     to: erc20Address,
        //     data: erc20contract.methods.approve(routerAddress ,new BigNumber(100000000000000000000), ).encodeABI(), //智能合约中方法的abi
           
        //   }
        //   const tx = new EthereumTx(txParams, { chain: 'ropsten' })
        // tx.sign(privateKey)
        // const serializedTx = tx.serialize()
        // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

        console.log("addLiquidityETH nonce: ",nonce)
        const txParams = {
            nonce: nonce,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            // value: web3.utils.toHex(new BigNumber(1000000000000000000)),
            to: stakingRewardsFactoryAddress,
            data: contract.methods.deploy(tsAddress,5000000).encodeABI(), //智能合约中set方法的abi
           
          }
          const tx = new TX(txParams, { chain: 'ropsten' })
        tx.sign(privateKey)
        const serializedTx = tx.serialize()
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    },
    e => console.log(e)
)
//调用合约的方法
//contract.methods.addLiquidityETH('0xDb52A451dbb800614F340cF8bfefE7A22aF41273',1000,1000,0.1,0x25c0F405d71A189352575d1afcD18245c04D85Eb, 12345679).call().then(console.log);

// address:  0x25c0F405d71A189352575d1afcD18245c04D85Eb
// addLiquidityETH nonce:  124
// {
//   blockHash: '0x95ecdebaf83a056e93d0c4c562ef00c5706787e4fcebbabfec6b23848cfaae08',
//   blockNumber: 9060416,
//   contractAddress: null,
//   cumulativeGasUsed: 1417058,
//   from: '0x25c0f405d71a189352575d1afcd18245c04d85eb',
//   gasUsed: 1417058,
//   logs: [],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   status: true,
//   to: '0x77dcfe8904d571cf05e4eedfa81c22c3cb57c444',
//   transactionHash: '0xe14004d0d1f92ae6c078dc20e7aee5d368a1fe8e36866e55aae40ce316bdbb38',
//   transactionIndex: 0
// }  
//0xa84325ff60734231BcB4C2dB42403d57bF3a8177
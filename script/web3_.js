var Web3 = require("web3");

var BigNumber = require("bignumber.js");
var TX = require("ethereumjs-tx")

const stakingRewardsFactoryAddress = "0x77Dcfe8904d571CF05e4EedFa81C22c3cB57c444";

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

        console.log("addLiquidityETH nonce: ",nonce)
        const txParams = {
            nonce: nonce,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            // value: web3.utils.toHex(new BigNumber(1000000000000000000)),
            to: stakingRewardsFactoryAddress,
            data: contract.methods.notifyRewardAmount('0xcF5422F6abb4c7EfbcAecfb8ccABb9288429756b').encodeABI(), //智能合约中set方法的abi
           
          }
          const tx = new TX(txParams, { chain: 'ropsten' })
        tx.sign(privateKey)
        const serializedTx = tx.serialize()
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    },
    e => console.log(e)
)

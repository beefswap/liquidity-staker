var Web3 = require("web3");
var stakingRewardsFactory = require("../build/StakingRewardsFactory.json");
var MockProvider = require("ethereum-waffle");
var ethers = require('ethers');
var Wallet = ethers.Wallet;
var utils = ethers.utils;
var providers = ethers.providers;

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var wallet = new Wallet('0x8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6',new providers.Web3Provider(web3.currentProvider));


async function main() {
    token = await MockProvider.deployContract(wallet, stakingRewardsFactory, ['0x833e7d4c9c943dd7b734fb7127e5e3f9c1a541e5',1605195040], {gasLimit: web3.utils.toHex(8000000)});
    // console.log(token.address);
    console.log(token);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });  



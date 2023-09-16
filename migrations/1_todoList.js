var TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TodoList);
};

var NewBorn = artifacts.require("./NewBorn.sol");

module.exports = (deployer) => {

  console.log("here i am !!!!!!!!!!!")
  
  deployer.deploy(NewBorn)
      .then(() => console.log(NewBorn.address))
};





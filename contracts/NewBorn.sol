pragma solidity >=0.4.21 <0.6.0;

contract NewBorn {
  
  struct sNewBornBata {
      bytes phoneNumber;
      bytes newBornData;
  }
  
  int numNewBorn;

  address public ownerAddress;
  mapping (address => bool) mapAllowedAdresses;
  mapping (int => sNewBornBata) mapIdNewBornData;
  
  
  event evNewBornAdded(int id, bytes phoneNumber, bytes newBornData);

  // This is the constructor whose code is run only when the contract is created.
  constructor() public {
    ownerAddress = msg.sender;
    numNewBorn = 0;
  }

  modifier onlyOwner() {
      if (msg.sender == ownerAddress) _;
  }

  function allowNewDataWriter(address newwriter) public onlyOwner {
      mapAllowedAdresses[newwriter] = true;
  }

  function changeDataWriter(address writeraddr, bool isactive) public onlyOwner {
      mapAllowedAdresses[writeraddr] = isactive;
  }

  function addNewborn(int newbornId,  bytes memory phoneNumber_, bytes memory newBornData_) public {

      require(mapAllowedAdresses[msg.sender] == true);

      sNewBornBata memory nbd;
      nbd.phoneNumber = phoneNumber_;
      nbd.newBornData = newBornData_;
      mapIdNewBornData[newbornId] = nbd;
      numNewBorn++;

      emit evNewBornAdded(newbornId,phoneNumber_,newBornData_);
  }
}
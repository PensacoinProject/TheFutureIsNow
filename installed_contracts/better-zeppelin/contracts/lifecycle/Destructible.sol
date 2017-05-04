pragma solidity ^0.4.8;


import "../ownership/Ownable.sol";

/* 
In practice any public Ethereum address is a target to receiving ETH. 
Often ETH will find its way to a Contract via send (not via a function call), even though the contract was not meant to receive ETH. For this reason all contracts should have a withdrawEther function, even after a contract is meant to retire. For this reason no contract should really ever selfdestruct, instead always only having the withdrawEther function active and disabling all other functions.
*/

contract Destructible is Ownable {

	bool contractActive = true;

  function destroy() onlyOwner destroyable {
    contractActive = false;
    withdrawEther();
  }

  function withdrawEther() payable onlyOwner returns (bool) {
      return owner.send(this.balance);
  }

  modifier destroyable() {
    if (!contractActive) {
      throw;
    }
    _;
  }
}



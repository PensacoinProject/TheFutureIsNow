pragma solidity ^0.4.8;

import 'zeppelin/token/StandardToken.sol';      // ERC20 Standard Token interface
import 'better-zeppelin/ownership/Ownable.sol';        // set specific function for owner only

/// @title GOZ Token
/// @author Riaan F Venter~ RFVenter~ <msg@rfv.io>
contract Token is Ownable, StandardToken {

    string public name = "GOZ";                 // name of the token
    string public symbol = "GOZ";               // ERC20 compliant 4 digit token code
    uint public decimals = 18;                  // token has 18 digit precision

    uint public totalSupply = 15000000 ether;   // total supply of 15 Million Tokens

    /// @notice Initializes the contract and allocates all initial tokens to the owner
    function Token() {
        balances[msg.sender] = totalSupply;
    }
  
    //////////////// owner only functions below

    /// @notice To transfer token contract ownership
    /// @param _newOwner The address of the new owner of this contract
    function transferOwnership(address _newOwner) onlyOwner {
        balances[_newOwner] = balances[owner];
        balances[owner] = 0;
        Ownable.transferOwnership(_newOwner);
    }
}

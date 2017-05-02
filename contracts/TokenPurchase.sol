pragma solidity ^0.4.8;

import 'zeppelin/ownership/Ownable.sol';        // set specific function for owner only
import 'zeppelin/lifecycle/Killable.sol';       // kill feature for contract
import 'zeppelin/token/ERC20.sol'; 				// ERC20 interface
import 'zeppelin/SafeMath.sol'; 				// safeMath

/// @title TokenPurchase
/// @author Riaan F Venter~ RFVenter~ <msg@rfv.io>
contract TokenPurchase is Ownable, Killable, SafeMath {

	uint public constant startTime = 1493130600;         	// 2017 April 25th 9:30 EST (14:30 UTC)
	uint public constant closeTime = startTime + 31 days;	// ICO will run for 31 days
	uint public constant price = 33333333333333333;     	// Each token has 18 decimal places, just like ether.
	uint private constant priceDayOne = price * 8 / 10;		// Day one price [20 % discount (x * 8 / 10)]
	uint private constant priceDayTwo = price * 9 / 10;		// Day two price [10 % discount (x * 9 / 10)]

	ERC20 public token;							// the address of the token 

	// //// time test functionality /////
	// uint public now;                //
	//                                 //
	// function setNow(uint _time) {   //
	//     now = _time;                //
	// }                               //
	// //////////////////////////////////

	/// @notice Used to buy tokens with Ether
	/// @return The amount of actual tokens purchased
	function purchaseTokens() payable returns (uint) {
	    // check if now is within ICO period, or if the amount sent is nothing
	    if ((now < startTime) || (now > closeTime) || (msg.value == 0)) throw;
	    
	    uint currentPrice;
	    // only using safeMath for calculations involving external incoming data (to safe gas)
	    if (now < (startTime + 1 days)) {       // day one discount
	        currentPrice = priceDayOne;
	    } 
	    else if (now < (startTime + 2 days)) {  // day two discount
	        currentPrice = priceDayTwo;
	    }
	    else if (now < (startTime + 12 days)) {
	        // 1 % reduction in the discounted rate from day 2 until day 12 (sliding scale per second)
	        currentPrice = price - ((startTime + 12 days - now) * price / 100 days);
	    }
	    else {
	        currentPrice = price;
	    }
	    uint tokens = safeMul(msg.value, 1 ether) / currentPrice;		// only one safeMath check is required for the incoming ether value

	    if (!token.transferFrom(owner, msg.sender, tokens)) throw;		// if there is some error with the token transfer, throw and return the Ether

	    return tokens;							// after successful purchase, return the amount of tokens purchased value
	}

	//////////////// owner only functions below

	/// @notice Withdraw all Ether in this contract
	/// @return True if successful
	function withdrawEther() payable onlyOwner returns (bool) {
	    return owner.send(this.balance);
	}

    /// @notice sets the token that is to be used for this Lottery
    /// @param _token The address of the ERC20 token
    function setToken(address _token) external onlyOwner {     
        token = ERC20(_token);
	}
}
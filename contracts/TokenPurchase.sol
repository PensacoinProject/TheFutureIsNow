pragma solidity ^0.4.8;

import 'better-zeppelin/ownership/Ownable.sol';        // set specific function for owner only
import 'better-zeppelin/lifecycle/Destructible.sol';       // kill feature for contract
import 'zeppelin/token/ERC20.sol'; 				// ERC20 interface
import 'zeppelin/SafeMath.sol'; 				// safeMath

/// @title TokenPurchase
/// @author Riaan F Venter~ RFVenter~ <msg@rfv.io>
contract TokenPurchase is Ownable, Destructible, SafeMath {

	uint public constant startTime = 1496293200;        	// June 1, 2017 00:00 (UTC -5)
	uint public constant closeTime = startTime + 30 days;	// ICO will run for 30 days
	uint public constant price = 12500000000000000;     	// Each token has 18 decimal places, just like ether.
	uint private constant priceWeekOne = price * 8 / 10;	// Day one price [20 % discount]
	uint private constant priceWeekTwo = price * 87 / 100;	// Day two price [13 % discount]
	uint private constant priceWeekThree = price * 9 / 10;	// Day two price [10 % discount]
	uint private constant priceWeekFour = price * 93 / 100;	// Day two price [7 % discount]

	ERC20 public token;										// the address of the token 

	// //// time test functionality /////
	// uint public now;                //
	//                                 //
	// function setNow(uint _time) {   //
	//     now = _time;                //
	// }                               //
	// //////////////////////////////////

	function () payable {
		purchaseTokens();
	}

	/// @notice Used to buy tokens with Ether
	/// @return The amount of actual tokens purchased
	function purchaseTokens() payable destroyable returns (uint) {
	    // check if now is within ICO period, or if the amount sent is nothing
	    if ((now < startTime) || (now > closeTime) || (msg.value == 0)) throw;
	    
	    uint currentPrice;
	    // only using safeMath for calculations involving external incoming data (to safe gas)
	    if (now < (startTime + 7 days)) {       	// week one discount
	        currentPrice = priceWeekOne;
	    } else if (now < (startTime + 14 days)) {  	// week two discount
	        currentPrice = priceWeekTwo;
	    } else if (now < (startTime + 21 days)) {	// week three discount
	        currentPrice = priceWeekThree;
	    } else {									// week three discount
	        currentPrice = priceWeekFour;			
	    }
	    uint tokens = safeMul(msg.value, 1 ether) / currentPrice;		// only one safeMath check is required for the incoming ether value

	    if (!token.transferFrom(owner, msg.sender, tokens)) throw;		// if there is some error with the token transfer, throw and return the Ether

	    return tokens;								// after successful purchase, return the amount of tokens purchased value
	}

	//////////////// owner only functions below

    /// @notice sets the token that is to be used for this Lottery
    /// @param _token The address of the ERC20 token
    function setToken(address _token) external onlyOwner destroyable {     
        token = ERC20(_token);
	}
}
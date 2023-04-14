// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ICO  {

    uint256 internal tokenPrice   ;
    uint256 internal tokensSold   ;

    address payable internal owner;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event ICOComplete(uint256 totalTokensSold, uint256 totalEtherReceived);

    IERC20 private SPIN ;

    constructor(address SPIN_ADDRESS) {
        owner       = payable(msg.sender);
        tokenPrice  = 1e15;
        SPIN        = IERC20(SPIN_ADDRESS);

    }

    function spinSetTokenPrice(uint256 _newPrice) external {
        require(msg.sender == owner); 
        tokenPrice = _newPrice;
    }

    function spinBuyTokens(uint256 _numTokens) external payable{
        
        require(msg.value == tokenPrice * _numTokens, "Incorrect payment amount");

        uint256 tokenBalance = SPIN.balanceOf(address(this));
        require(tokenBalance >= _numTokens, "Insufficient tokens in contract");

        tokensSold += _numTokens;
        require(SPIN.approve(msg.sender, _numTokens * (10**18)), "Token  approve failed");
        require(SPIN.transfer(msg.sender,_numTokens * (10**18)), "Token transfer failed");
        balanceOf[msg.sender] += _numTokens;

    }

    function spinBalanceContract() external view returns(uint256){
        return SPIN.balanceOf(address(this));
    }

    function spinBalanceSender() external view returns(uint256){
        return SPIN.balanceOf(msg.sender);
    }

    function spinBalanceBought() external view returns(uint256){
        return balanceOf[msg.sender];
    }

    receive() external payable{

    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CORECASH is ERC20,Pausable {

    address internal immutable _arbiter;

    modifier onlyArbiter(){
        require(msg.sender == _arbiter);
        _;
    }
    
    constructor(uint256 supply,address __arbiter) ERC20("CORECASH", "CRH") {
        _mint(msg.sender, supply);
        _arbiter = __arbiter     ;
    }

    function transfer(address to, uint256 amount) public override  whenNotPaused returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public override whenNotPaused  returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(address from,address to,uint256 amount) public  override whenNotPaused returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public override whenNotPaused  returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function pause()   external onlyArbiter {
        _pause();
    }

    function unpause() external  onlyArbiter {
        _unpause();
    }


}
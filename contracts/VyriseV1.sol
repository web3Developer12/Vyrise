// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol"   ;

contract VyriseV1 is Initializable, ERC20Upgradeable{

    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("VYRISE", "VYR");
        _mint(msg.sender, 120000000 * (10 ** decimals()));
    }

}
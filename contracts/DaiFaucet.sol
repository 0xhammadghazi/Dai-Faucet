// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DaiFaucet {
    IERC20 daiContract;
    address owner;

    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    constructor() {
        daiContract = IERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
        owner = msg.sender;
    }

    // Accept any incoming amount
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function transferDai(address _recipient, uint256 _amount) external {
        //limiting withdrawal amount to 5 Dai/ transaction
        require(_amount <= 5000000000000000000);

        //Checking contract's Dai balance
        require(
            daiContract.balanceOf(address(this)) >= _amount,
            "Insufficient balance in this contract for withdrawal request"
        );

        // Send the amount to the address that requested it
        daiContract.transfer(_recipient, _amount);
        emit Withdrawal(msg.sender, _amount);
    }

    //To check remaining dai in this contract
    function daiBalance() public view returns (uint256) {
        return daiContract.balanceOf(address(this));
    }

    // To shutdown the contract.
    function destroy() public {
        //only owner can shutdown this contract
        require(owner == msg.sender, "Access Denied!");
        daiContract.transfer(owner, daiContract.balanceOf(address(this)));

        // cast address to payable
        address payable addr = payable(address(owner));
        selfdestruct(addr);
    }
}

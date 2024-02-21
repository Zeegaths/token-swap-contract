// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// import "./IERC20.sol";
import "./token1.sol";
import "./token2.sol";


contract TokenSwap  {

    //state variables
    IERC20 public tokenA;
   
    IERC20 public tokenB;
   

    //mapping
    mapping(address => uint) public balanceOf;


    event Transfer(address indexed from, address indexed to, uint value);  

//initiating the tokens
    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);        
}

//swap token1 for token2
    function tokenSwap1(uint amount1) external {  
        uint amount2 = amount1 * 10; 

        // require (amount2 <= tokenB.allowance(msg.sender, address(this)),"allowance too low");   

        require (accountBalA(msg.sender) >= amount1, "insufficient funds"); 

        // balanceOf[msg.sender] = balanceOf[msg.sender] - amount1;

        // balanceOf[msg.sender] = balanceOf[msg.sender] + amount2;
        

        // (msg.sender) -= amount1; 

        

        IERC20(tokenA).transferFrom(msg.sender, address(this), amount1);

        IERC20(tokenB).transfer(msg.sender, amount2); 

        emit Transfer(address(this), msg.sender, amount2);
    } 
    

//swap token2 for token1
    function tokenSwap2(uint amount2) external {

        require(amount2 >= 10, "amount has to be greater than 10");

        uint amount1 = amount2 / 10;

        // require (tokenA.allowance(msg.sender, address(this)) >= amount1, "allowance too low");        
        
        require (tokenB.balanceOf(address(this)) >= amount1, "insufficient funds");

        IERC20(tokenB).transferFrom(msg.sender, address(this), amount2);

        IERC20(tokenA).transfer(msg.sender, amount1);   

        emit Transfer(address(this), msg.sender, amount1); 
    }

    function accountBalA(address _address) public view returns (uint) {
        return tokenA.balanceOf(_address);
    }


    function accountBalB() public view returns (uint) {
        return tokenB.balanceOf(msg.sender);
    }
    
    

      


}

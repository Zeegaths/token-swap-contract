import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { IERC20 } from "../typechain-types";
import { TokenSwap } from "../typechain-types";

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";


describe("SwapToken", function () {

  // let swapToken: SwapToken;
  // let tokenA: TokenA;
  // let tokenB: TokenB;
  
  async function deploySwapToken() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, accountB, otherAccount] = await ethers.getSigners();

    const TokenA = await ethers.getContractFactory("TokenA");
    const tokenA = await TokenA.deploy();

    const TokenB = await ethers.getContractFactory("TokenB");
    const tokenB = await TokenB.deploy();

    const SwapToken = await ethers.getContractFactory("TokenSwap");
    const swapToken = await SwapToken.deploy(tokenA.target, tokenB.target);

    await tokenA.transfer(swapToken.target, 30000 )
    await tokenB.transfer(swapToken.target, 30000 )

    await tokenA.transfer(otherAccount, 3000 )
    await tokenB.transfer(otherAccount, 3000 )

    return { tokenA, tokenB, swapToken, owner, otherAccount, accountB };
  }

  describe("Tokenswap1", function () {
    it ("swap AtoB properly", async()=>{
      const { tokenA, tokenB, swapToken, owner, otherAccount, accountB  } = await loadFixture(deploySwapToken);

      const threeHundred = 300;
      const tx1 = await tokenA.balanceOf(otherAccount)

      // console.log(tx1, "A bal b4")

      // const tx2 = await tokenB.balanceOf(otherAccount)

      // console.log(tx2, "B bal b4")

      await tokenA.connect(otherAccount).approve(swapToken.target, threeHundred)

      await swapToken.connect(otherAccount).tokenSwap1(200)

      const tx = await tokenA.balanceOf(otherAccount)

      // console.log(tx, "A balafter")

      const tx3 = await tokenB.balanceOf(otherAccount)

      // console.log(tx3, "B bal after")
      expect(tx).to.be.equal(2800);
      expect(tx3).to.be.equal(5000); 
    })

    it ("swap B to A properly", async()=>{
      const { tokenA, tokenB, swapToken, owner, otherAccount, accountB  } = await loadFixture(deploySwapToken);

      const threeHundred = 4000;
      const tx1 = await tokenA.balanceOf(otherAccount)

      // console.log(tx1, "A bal b4")

      // const tx2 = await tokenB.balanceOf(otherAccount)

      // console.log(tx2, "B bal b4")

      await tokenB.connect(otherAccount).approve(swapToken.target, threeHundred)

      await swapToken.connect(otherAccount).tokenSwap2(2000);

      const tx = await tokenA.balanceOf(otherAccount)

      // console.log(tx, "A balafter")

      const tx3 = await tokenB.balanceOf(otherAccount)

      // console.log(tx3, "B bal after")
      expect(tx).to.be.equal(3200);
      expect(tx3).to.be.equal(1000); 
    })
 
    //   const { tokenA, tokenB, swapToken, owner, otherAccount, accountB  } = await loadFixture(deploySwapToken);
    //   const allow1 = 2000000;
    //   const allow2 = 2000000;

    //   const amount1 = 10;
    //   const amount2 = 2000;

    //   await (tokenA as IERC20).connect(owner).approve(swapToken.target, allow1);
    //   await (tokenB as IERC20).connect(owner).approve(swapToken.target, allow2);

    //   await swapToken.tokenSwap1(amount1)

    //   // await(tokenA as IERC20).connect(owner).transfer(swapToken.target, allow1);
    //   // await(tokenB as IERC20).connect(owner).transfer(swapToken.target, allow2);

    //   // await (tokenA as IERC20).transfer(owner, 10000);

    
    //   // await (tokenB as IERC20).connect(owner).transfer(otherAccount, allow2);


    //   // await swapToken.connect(owner).tokenSwap1(amount1);

    //   // const txContract =  await (tokenB as IERC20).connect(owner).balanceOf(owner);

    //   // console.log(txContract);

      
    //   // expect(txContract).to.equal(1000);
    // });

    // it("Should set the right owner", async function () {
    //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);

    //   expect(await lock.owner()).to.equal(owner.address);
    // });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.target)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

  // describe("Withdrawals", function () {
    // describe("Validations", function () {
    //   it("Should revert with the right error if called too soon", async function () {
    //     const { lock } = await loadFixture(deployOneYearLockFixture);

    //     await expect(lock.withdraw()).to.be.revertedWith(
    //       "You can't withdraw yet"
    //     );
    //   });

    //   it("Should revert with the right error if called from another account", async function () {
    //     const { lock, unlockTime, otherAccount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     // We can increase the time in Hardhat Network
    //     await time.increaseTo(unlockTime);

    //     // We use lock.connect() to send a transaction from another account
    //     await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
    //       "You aren't the owner"
    //     );
    //   });

    //   it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    //     const { lock, unlockTime } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     // Transactions are sent using the first signer by default
    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw()).not.to.be.reverted;
    //   });
    // });

    // describe("Events", function () {
    //   it("Should emit an event on withdrawals", async function () {
    //     const { lock, unlockTime, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw())
    //       .to.emit(lock, "Withdrawal")
    //       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //   });
    // });

    // describe("Transfers", function () {
    //   it("Should transfer the funds to the owner", async function () {
    //     const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw()).to.changeEtherBalances(
    //       [owner, lock],
    //       [lockedAmount, -lockedAmount]
    //     );
    //   });
    // });
  });
});

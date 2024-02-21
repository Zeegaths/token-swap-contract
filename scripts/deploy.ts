import { ethers } from "hardhat";

async function main() {
  
  const tokenSwap = await ethers.deployContract("TokenSwap", [
    "0x7A00F91e568D66580C3A3ab652145697D3E7Ac8e",
    "0x0c185b58366B2A4b109c0Da50451f7e22Fac3F0F",
  ]);

  await tokenSwap.waitForDeployment();

  console.log(
    `TokenSwap with deployed to ${tokenSwap.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

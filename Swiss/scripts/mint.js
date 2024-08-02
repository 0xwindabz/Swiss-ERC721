const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xF6780a68c42c5e9E5D1C022b8b1413C5df7A625F";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("windabzSwiss");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "MintERC721";
  const MintERC721Tx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName),
    0
  );

  await MintERC721Tx.wait();

  console.log("Transaction Receipt: ", MintERC721Tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

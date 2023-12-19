import { Avalanche, Mnemonic, Buffer } from "@avalabs/avalanchejs"

async function gen() {
  const avalanche = new Avalanche();
  const xchain = avalanche.XChain()
  // const mnemonic = Mnemonic.getInstance().generateMnemonic()

  const keychain = xchain.keyChain()
  const keypair = keychain.makeKey()
  const address = keypair.getAddressString()

  
  console.log("address:", address)
  // console.log("mnemonic:", mnemonic)
  console.log("privateKey:", keypair.getPrivateKeyString())
  // console.log("publicKey:", keypair.getPublicKeyString())
}

gen();
/**
 * hd-wallet-derivation.ts
 *
 * Demonstrates deriving multiple Solana keypairs from a single BIP39
 * mnemonic seed phrase, using the standard Solana BIP44 derivation
 * path: m/44'/501'/{account}'/0'
 *
 * Run: npx ts-node src/hd-wallet-derivation.ts
 */

import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

function main() {
  // Generate a new 12-word mnemonic (or supply your own for reproducibility)
  const mnemonic = generateMnemonic();
  console.log("Mnemonic:", mnemonic);

  // Convert the mnemonic into a binary seed
  const seed = mnemonicToSeedSync(mnemonic);

  // Derive several accounts from the same seed using the Solana
  // BIP44 path convention: m/44'/501'/<account_index>'/0'
  const ACCOUNTS_TO_DERIVE = 4;

  for (let i = 0; i < ACCOUNTS_TO_DERIVE; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

    console.log(`Account ${i} (${path}):`, publicKey);
  }
}

main();

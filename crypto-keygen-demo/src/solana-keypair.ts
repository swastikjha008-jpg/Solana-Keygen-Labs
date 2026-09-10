/**
 * solana-keypair.ts
 *
 * Demonstrates generating a Solana keypair (@solana/web3.js) and
 * signing / verifying a message with tweetnacl using the raw
 * secret key bytes.
 *
 * Run: npx ts-node src/solana-keypair.ts
 */

import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

function main() {
  // Generate a new random Solana keypair
  const keypair = Keypair.generate();

  // Extract the public and private (secret) keys
  const publicKey = keypair.publicKey.toString();
  const secretKey = keypair.secretKey;

  console.log("Public Key:", publicKey);
  console.log("Secret Key:", secretKey);

  // Sign a message with the secret key
  const message = new TextEncoder().encode("hello world");
  const signature = nacl.sign.detached(message, secretKey);

  // Verify the signature against the message and the public key bytes
  const isValid = nacl.sign.detached.verify(
    message,
    signature,
    keypair.publicKey.toBytes()
  );

  console.log("Signature valid:", isValid); // should print `true`
}

main();

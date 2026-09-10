/**
 * ed25519-sign-verify.ts
 *
 * Demonstrates generating an ed25519 keypair, signing a message,
 * and verifying the signature using @noble/ed25519.
 *
 * Run: npx ts-node src/ed25519-sign-verify.ts
 */

import * as ed from "@noble/ed25519";

async function main() {
  // Generate a secure random private key
  const privateKey = ed.utils.randomPrivateKey();

  // Encode the message we want to sign
  const message = new TextEncoder().encode("hello world");

  // Derive the public key from the private key
  const publicKey = await ed.getPublicKeyAsync(privateKey);

  // Sign the message
  const signature = await ed.signAsync(message, privateKey);

  // Verify the signature against the message and public key
  const isValid = await ed.verifyAsync(signature, message, publicKey);

  console.log("Public Key:", Buffer.from(publicKey).toString("hex"));
  console.log("Signature:", Buffer.from(signature).toString("hex"));
  console.log("Signature valid:", isValid); // should print `true`
}

main();


# 🔐 Crypto Keygen Demo

Self-contained TypeScript demos covering ed25519 cryptography, Solana keypair generation, and BIP39/BIP44 hierarchical deterministic (HD) wallet derivation.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Solana](https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=black)
![Web3](https://img.shields.io/badge/Web3-F16822?style=for-the-badge&logo=web3dotjs&logoColor=white)
![Ed25519](https://img.shields.io/badge/Ed25519-6E40C9?style=for-the-badge&logo=keybase&logoColor=white)
![BIP39](https://img.shields.io/badge/BIP39%2F44-F7931A?style=for-the-badge&logo=bitcoin&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-4CAF50?style=for-the-badge)

---

## 📖 Overview

This repo walks through the core building blocks of wallet cryptography, from a raw signature scheme up to how wallets like Phantom derive multiple accounts from one seed phrase.

| # | File | Concept |
|---|---|---|
| 1 | `src/ed25519-sign-verify.ts` | Raw ed25519 keypair generation, signing, and verification (`@noble/ed25519`) |
| 2 | `src/solana-keypair.ts` | Solana `Keypair` generation, signing/verifying with `tweetnacl` |
| 3 | `src/hd-wallet-derivation.ts` | BIP39 mnemonic → BIP44 path (`m/44'/501'/{i}'/0'`) → multiple Solana accounts |

---

## 🌐 First Steps into Web3

New to Web3 dev? Here's the mental model this repo builds on, in order:

1. **Keypairs are just math** — a private key is a random number; a public key is derived from it via elliptic-curve math (ed25519 here). You never "choose" a public key, it's computed.
2. **Signing proves ownership** — signing a message with your private key produces a signature anyone can verify against your public key, without ever exposing the private key itself.
3. **Wallets = keypairs + UI** — Phantom, Solflare, etc. are just convenient wrappers around exactly what `solana-keypair.ts` does.
4. **Seed phrases = one master key** — a 12/24-word mnemonic (BIP39) deterministically generates a master seed. You never store 10 separate private keys — you store one phrase.
5. **HD derivation = many accounts, one phrase** — BIP44 paths (`m/44'/501'/{account}'/0'`) let one seed phrase produce unlimited accounts, each independently usable, all recoverable from the same phrase.

Once these five clicks, most of Solana/Ethereum wallet tooling stops feeling like magic.

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js + ts-node
- **Cryptography:** [@noble/ed25519](https://github.com/paulmillr/noble-ed25519), [tweetnacl](https://github.com/dchest/tweetnacl-js)
- **Blockchain SDK:** [@solana/web3.js](https://github.com/solana-labs/solana-web3.js)
- **Wallet derivation:** [bip39](https://github.com/bitcoinjs/bip39), [ed25519-hd-key](https://github.com/alepop/ed25519-hd-key)

---

## 🚀 Setup

```bash
git clone <your-repo-url>
cd crypto-keygen-demo
npm install


▶️ Run

npm run ed25519    # sign & verify with raw ed25519
npm run solana      # generate a Solana keypair & sign a message
npm run hd-wallet   # derive multiple accounts from one mnemonic




📂 Project Structure

crypto-keygen-demo/
├── src/
│   ├── ed25519-sign-verify.ts
│   ├── solana-keypair.ts
│   └── hd-wallet-derivation.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md




⚠️ Security Notes





These scripts generate fresh random keys/mnemonics on every run — nothing here holds real funds.



Never commit or share a real mnemonic, private key, or secret key from an actual wallet.



hd-wallet-derivation.ts uses a random mnemonic by default; swap in a fixed string only for local testing, never commit it.



📜 License

MIT




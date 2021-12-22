import { SnappyStore } from "./DataStore";
class CryptoService {
  static async generateKeyPair() {
    let keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );

    return keyPair;
  }

  static async encMessage(message: string, publicKey: CryptoKey) {
    let encoded = new TextEncoder().encode(message);
    let buffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      encoded
    );

    let blob = new Blob([buffer], { type: "text/plain; charset=utf-8" });
    return await blob.text();
  }

  //   static decMessage(cipher: string, privateKey: CryptoKey): string {}
}

export default CryptoService;

import CryptoJS from "crypto-js";

const secretKey = 'your-very-secure-secret-key';

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      console.warn("Decryption failed: empty string");
      return null;
    }

    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Failed to decrypt or parse JSON:", error);
    return null;
  }
};


//crypto file
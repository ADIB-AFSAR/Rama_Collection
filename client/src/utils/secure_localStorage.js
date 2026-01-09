// src/utils/storage.js
import CryptoJS from "crypto-js";

const SECRET_KEY = "ramacollectionshop@123";  
// Save encrypted data to localStorage
export const secureSet = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  } catch (err) {
    console.error("secureSet error:", err);
  }
};

// Get and decrypt data from localStorage
export const secureGet = (key) => {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("secureGet error:", err);
    return null;
  }
};

// Remove key from localStorage
export const secureRemove = (key) => {
  localStorage.removeItem(key);
};

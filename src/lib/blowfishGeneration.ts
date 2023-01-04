import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

export const generateKeyIv = (inputString: string) => {
  const hash = CryptoJS.SHA512(inputString).toString();
  const key_length = 30
  const iv_length = 8
  const key = hash.substring(0, key_length * 2);
  const iv = hash.substring(key_length * 2, (key_length + iv_length) * 2);
  return [
    Buffer.from(CryptoJS.enc.Hex.parse(key).toString(), 'hex'),
    Buffer.from(CryptoJS.enc.Hex.parse(iv).toString(), 'hex')
  ];
}

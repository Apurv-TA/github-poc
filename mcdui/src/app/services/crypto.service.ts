import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
cipherEnctext:any
cipherDectext:any
request: any;
responce: any;
  constructor() {}

encryptMethod(params:any,dataValue:any){
 return CryptoJS.AES.encrypt(params.trim(), dataValue).toString();
}

decryptMethod(params:any,dataValue:any){
  return CryptoJS.AES.decrypt(params.trim(), dataValue).toString(CryptoJS.enc.Utf8);
}

// encryptNewMethod(){
// var KEY = 'This is a key123';
// var IV = 'This is an IV456';
// var MODE = new Crypto.mode.CFB(Crypto.pad.ZeroPadding);

// var plaintext = 'The answer is no';
// var input_bytes = Crypto.charenc.UTF8.stringToBytes(plaintext);
// var key = Crypto.charenc.UTF8.stringToBytes(KEY);
// var options = {iv: Crypto.charenc.UTF8.stringToBytes(IV), asBytes: true, mode: MODE};
// var encrypted = Crypto.AES.encrypt(input_bytes, key, options);
// var encrypted_hex = Crypto.util.bytesToHex(encrypted);
// console.log(encrypted_hex); // this is the value you send over the wire

// var output_bytes = Crypto.util.hexToBytes(encrypted_hex);
// var output_plaintext_bytes = Crypto.AES.decrypt(output_bytes, key, options);
// var output_plaintext = Crypto.charenc.UTF8.bytesToString(output_plaintext_bytes);
// console.log(output_plaintext); // result: 'The answer is no'
// }
  // encryptUsingAES256(inputvalue:any) {
  //   let _key = CryptoJS.enc.Utf8.parse(inputvalue);
  //   let _iv = CryptoJS.enc.Utf8.parse(inputvalue);
  //   let encrypted = CryptoJS.AES.encrypt(
  //     JSON.stringify(this.request), _key, {
  //       keySize: 16,
  //       iv: _iv,
  //       mode: CryptoJS.mode.ECB,
  //       padding: CryptoJS.pad.Pkcs7
  //     });
  //  return encrypted.toString();
  // }
  // decryptUsingAES256(outputvalue:any) {
  //   let _key = CryptoJS.enc.Utf8.parse(outputvalue);
  //   let _iv = CryptoJS.enc.Utf8.parse(outputvalue);

  //   return  CryptoJS.AES.decrypt(
  //     outputvalue, _key, {
  //       keySize: 16,
  //       iv: _iv,
  //       mode: CryptoJS.mode.ECB,
  //       padding: CryptoJS.pad.Pkcs7
  //     }).toString(CryptoJS.enc.Utf8);
  // }
}


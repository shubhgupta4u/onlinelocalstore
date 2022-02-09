import { Injectable } from '@angular/core';
import { Configuration } from '../../models/config';
import { AES, enc } from "crypto-js";

@Injectable()
export class CryptoService {

  constructor(private config: Configuration) {}
 
  encrypt(plainText:string): string {
    let cypherText:string = AES.encrypt(plainText, this.config.cryptoKey).toString(); 
    return cypherText;
  }

  decrypt(cypherText:string): string {
      let bytes:any  = AES.decrypt(cypherText, this.config.cryptoKey);
      let plaintext:string = bytes.toString(enc.Utf8);
      return plaintext;
  }
}

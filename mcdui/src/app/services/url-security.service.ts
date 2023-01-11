import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ApiService } from './api.service';
import { UtilService } from './util.service';
import * as constant from '../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UrlSecurityService {

  tokenFromUI: string = constant.login_page.CRYPTO_PASSWORD;
  encrypted: any;
  decrypted: any;

  constructor(private basicAuthenticationService: ApiService,
    private utils: UtilService) {

  }


  encryptUsingAES256(request: string) {
    if (!this.utils.isNullOrEmptyOrUndefined(request)) {
      this.encrypted = CryptoJS.AES.encrypt(request.toString(), this.tokenFromUI);
      return this.encrypted.toString();
    } else {
      return '';
    }
  }

  decryptUsingAES256(request: string) {
    if (!this.utils.isNullOrEmptyOrUndefined(request)) {
      var decrypted = CryptoJS.AES.decrypt(request, this.tokenFromUI);
      this.decrypted = decrypted.toString(CryptoJS.enc.Utf8);
      return this.decrypted;
    } else {
      return '';
    }

  }

}

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../shared/constant/constant';
import { DateUtilsService } from './date-utils.service';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(public dateUtilsService: DateUtilsService, private translateService: TranslateService) { }


  /**
 * param string
 *            a string
 * return true if the string is not null, not undefined and has non-whitespace length at least
 *         one, else false
 */
  isNullOrEmptyOrUndefined(data: any): boolean {
    return (data == null || data == undefined || data === '');
  }

  /**
* param response 
*            a vs.excel format
* download  excel format with given (file name with date)
*/
  downloadFile(response: any,a=0) {
    const blob = new Blob([response], {
      type: constant.login_page.applicationType
    });
    var downloadURL = window.URL.createObjectURL(response);
    var link = document.createElement('a');
    link.href = downloadURL;
    var filename='';
    if(a==1){
      filename="Product Mapping"
    }
    else{
     filename = constant.login_page.report + this.dateUtilsService.dateConverter(new Date());}
    link.download = filename + constant.login_page.xlxs;
    link.click();
  }
  downloadPDFFile(response: any) {
    const blob = new Blob([response], {
      type: 'application/pdf'
    });
    var downloadURL = window.URL.createObjectURL(response);
    var link = document.createElement('a');
    link.href = downloadURL;
    // var filename: any = constant.login_page.report + this.dateUtilsService.dateConverter(new Date());
    var filename="Mechanic Details";
    link.download = filename + constant.login_page.pdf;
    link.click();
  }

  /** Start Date Min Validation */
  startDateCalulationMin(startDate: any) {
    let minStartDate;
    let date = new Date();
    date.setDate(date.getDate() + parseInt(startDate));
    minStartDate = new Date(date);
    return minStartDate
  }

  /** Start Date Min Validation */
  startDateCalulationMax(startdate: any, enddate: any) {
    let minStartDate = new Date();
    let maxStartDate;
    let date = new Date();
    date.setDate(date.getDate() + parseInt(startdate));
    minStartDate = new Date(date);
    let fromDate = new Date(minStartDate);
    fromDate.setDate(date.getDate() + parseInt(enddate));
    maxStartDate = new Date(fromDate);
    return maxStartDate
  }

  /** Create Date Min Validation */
  createDateCalulationMin(createDate: any) {
    let minYear;
    if (createDate == constant.preview_page.one) {
      const currentYear = new Date().getFullYear();
      minYear = new Date(currentYear - 0, 0, 1);
    } else if (createDate == constant.preview_page.two) {
      const currentYear = new Date().getFullYear();
      minYear = new Date(currentYear - 1, 0, 1);
    }
    return minYear
  }

  /** Create Date Max Validation */
  createDateCalulationMax(createDate: any) {
    let maxDate;
    if (createDate == constant.preview_page.one) {
      const currentYear = new Date().getFullYear();
      maxDate = new Date(currentYear + 1, 0, 0);
    } else if (createDate == constant.preview_page.two) {
      const currentYear = new Date().getFullYear();
      maxDate = new Date(currentYear + 1, 0, 0);
    }
    return maxDate
  }

  /**
* param translated value 
*            
* Do the translation based on the selected language.
*/
  languageTranslator(key: any): string {
    let translatedvalue: any;
    this.translateService.get(key).subscribe(value => {
      translatedvalue = value;
    });
    return translatedvalue;
  }

  /**
   * Param 
   */
  calculateWeaks(weaks: number) {
    return new Date(Date.now() + 7 * weaks * (3600 * 1000 * 24));
  }

  /**
   * 
   * @param array 
   * @returns 
   */
  hasDuplicates(array: any) {
    return (new Set(array)).size !== array.length;
  }

  userAccess(key: any) {
    let userData: any = [];
    userData = JSON.parse(sessionStorage.getItem(constant.userAccess.user_Access) || "")
    for (var i = 0; i < userData.length; i++) {
      if (key == userData[i].page_id) {
        return userData[i].is_access
      }
    }
  }

  /**
   * 
   * @param event 
   * @param fixedPoint 
   * @returns 
   */
  toFixedFormat(event: any, fixedPoint: number) {
    if (!isNaN(event)) {
      if (event && (event != undefined || event != '-' || event != 'NaN')) {
        return event.toFixed(fixedPoint);
      } else if (event == 0) {
        return event.toFixed(fixedPoint);
      } else {
        return event
      }
    }else {
      return " - ";
    }
  }
}

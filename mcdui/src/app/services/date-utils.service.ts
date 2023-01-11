import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateTime } from "luxon";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  getCurrentUtcTime() {
    let date = new Date();
    return Math.floor((date).getTime() / 1000);
  }

  getUtcTimeByDate(dateObj: any, hrs: any, mins: any, sec: any) {
    let pipe = new DatePipe('en-US');
    dateObj.setHours(hrs);
    dateObj.setMinutes(mins);
    dateObj.setSeconds(sec);
    let date = new Date(dateObj);
    return Math.floor((date).getTime() / 1000);
  }

  getMonthYear(dateObj: any) {
    dateObj = new Date(dateObj);
    let year = dateObj.getFullYear();
    let month = `${dateObj.getMonth() + 1}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    return `${month}/${year}`;
  }


  timezoneDetected() {
    var dtDate = new Date('1/1/' + (new Date()).getUTCFullYear());
    var intOffset = 10000;
    var intMonth;

    for (intMonth = 0; intMonth < 12; intMonth++) {
      dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);
      if (intOffset > (dtDate.getTimezoneOffset() * -1)) {
        intOffset = (dtDate.getTimezoneOffset() * -1);
      }
    }
    return intOffset * 60 * 1000;
  };

  getLocalTimeZoneName() {
    var local = DateTime.local();
    return local.zoneName;
  }

  getOffsetInHoursAndMin() {
    let sec = this.timezoneDetected();
    sec = sec / 1000;

    if (Math.sign(sec) === 1) {
      return this.secondsToHms(sec);
    } else {
      return "-" + this.secondsToHms(Math.abs(sec));
    }
  }

  secondsToHms(d: any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h < 10 ? `0${h}` : h;
    var mDisplay = m < 10 ? `0${m}` : m;
    return hDisplay + "." + mDisplay;
  }


  getTimeNow() {
    let dt = DateTime.local();
    let hour: any = (dt.hour).toString();
    let minute: any = (dt.minute).toString();
    let second: any = (dt.second).toString();

    if (hour.length < 2) {
      hour = `0${hour}`;
    }
    if (minute.length < 2) {
      minute = `0${minute}`;
    }

    if (second.length < 2) {
      second = `0${second}`;
    }
    return `${hour}:${minute}:${second}`;
  }

  currentDateToUTC() {
    let dt = new Date().toISOString();
    let a = dt.split('.');
    let b = a[0].split(":");
    b.pop();
    return b.join(':') + ':00Z';
  }

  getCurrentLocalDateTimeString(format?: any) {
    let dateObj = new Date();
    let pipe = new DatePipe('en-US');
    let dateString = '';
    if (format) {
      dateString = `${pipe.transform(dateObj, format)}`;
    } else {
      dateString = `${pipe.transform(dateObj, 'MM/dd/yyyy')}`;
    }
    return dateString;
  }


  getUTCDateFormatFromUTCTime(time: any, utc?: any, format?: any) {
    if (utc) {
      time = parseInt(time) * 1000;
    }
    let date = DateTime.fromMillis(time);
    let dateString = '';
    if (format) {
      dateString = date.toUTC().toFormat(format);
    } else {
      dateString = date.toUTC().toFormat('MM/dd/yyyy');
    }
    return dateString;
  }

  getTodayDateStr() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getStartUtcTimeByDays(days: any) {
    if (!days) {
      return (new Date()).getTime();
    }
    let date = DateTime.fromISO(`${this.getTodayDateStr()}T00:00:00-00:00`);
    let millis = date.toMillis();
    return (millis - (days * 24 * 60 * 60 * 1000));
  }

  getDateStrByDateObj(d: any) {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  convertSecondsToTime(seconds: any) {
    if (seconds > 3600) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    } else {
      return new Date(seconds * 1000).toISOString().substr(14, 5)
    }
  }

  //We can use moment aswell

  dateConverter(myDate: any) {
    const d = new Date(myDate)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return da + "-" + mo + "-" + ye;

  }
}
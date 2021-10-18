import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

// to catch error
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  // create a variable which hold path to which will post the date
  _url = 'http://localhost:3000/api/submit';
  _url_supervision = 'http://localhost:3000/api/supervisors';

  constructor(public _httpClient: HttpClient) { }

  // create a method called enroll which will post the data to server
  enroll(user: User) {
    return this._httpClient.post<any>(this._url, user)
      .pipe(catchError(this.errorHandler)) //catch errors
  }

  // create a method called enroll which will post the data to server
  send_supervision_request() {
    return this._httpClient.get(this._url_supervision)
      .pipe(catchError(this.errorHandler)) //catch errors
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}

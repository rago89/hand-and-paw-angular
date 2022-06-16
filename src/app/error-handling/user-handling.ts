import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleUserError = (error: HttpErrorResponse) => {
  let errorMessage = 'An error has occurred';
  if (!error.error || !error.error.message) {
    return throwError(() => errorMessage);
  }
  if (error.error.message.includes('email')) {
    errorMessage = 'Cannot create user, email already exist!';
    return throwError(() => errorMessage);
  }
  if (error.error.message.includes('password')) {
    errorMessage = 'Passwords are not equal!';
    return throwError(() => errorMessage);
  }
  return throwError(() => errorMessage);
};

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleUserError = (error: HttpErrorResponse) => {
  let errorMessage = 'An error has occurred';
  if (!error.error || !error.error.message) {
    return throwError(() => errorMessage);
  }
  if (
    error.error.message.includes('email') &&
    error.error.message.includes('already exist')
  ) {
    errorMessage = 'Cannot create user, email already exist!';
    return throwError(() => errorMessage);
  }
  if (error.error.message.includes('passwords are not equal')) {
    errorMessage = 'Passwords are not equal!';
    return throwError(() => errorMessage);
  }
  if (
    error.error.message.includes(
      'New password and current password are the same!'
    )
  ) {
    errorMessage = 'New password and current password are the same!';
    return throwError(() => errorMessage);
  }
  if (
    error.error.message.includes('Current email and New email are the same!')
  ) {
    errorMessage = 'Current email and New email are the same!';
    return throwError(() => errorMessage);
  }
  return throwError(() => errorMessage);
};

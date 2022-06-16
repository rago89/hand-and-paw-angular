import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleAuthError = (error: HttpErrorResponse) => {
  let errorMessage = 'An error has occurred';
  if (!error.error || !error.error.message) {
    return throwError(() => errorMessage);
  }
  if (error.error.message.includes('VE006')) {
    errorMessage = 'Cannot create user, email already exist!';
    return throwError(() => errorMessage);
  }
  switch (error.error.message) {
    case 'password is required':
      errorMessage = 'password is required';
      break;
    case 'email is required':
      errorMessage = 'email is required';
      break;
    case 'You need to register to login':
      errorMessage = 'You need to register to login';
      break;
    case 'Incorrect password':
      errorMessage = 'Incorrect password';
      break;
  }
  return throwError(() => errorMessage);
};

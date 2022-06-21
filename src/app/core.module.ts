import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
})
export class CoreModule {}

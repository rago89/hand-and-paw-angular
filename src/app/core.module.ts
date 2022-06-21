import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './components/user/forms/auth-guard.service';
import { AuthInterceptorService } from './components/user/forms/auth-interceptor.service';

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

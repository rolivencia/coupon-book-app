import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@app/_services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const customer = this.authenticationService.currentCustomer;
    if (customer && customer.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${customer.token}`
        }
      });
    }

    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey = '6ea3783b-f3dd-4988-9376-c29e17d3014c';
    const newRequest = request.clone({
      setHeaders: {
        'Api-Key': apiKey
      }
    });

    return next.handle(newRequest);
  }
}

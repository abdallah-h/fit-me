import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingService } from '../services/loading.service';
/**
 * Add loading spinner for every HTTP request
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.busy();
    return next.handle(req).pipe(
      delay(500),
      finalize(() => {
        this.loadingService.idle();
      })
    );
  }
}

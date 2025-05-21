import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  public readonly loading$ = this._loading.asObservable();

  show() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this._loading.next(true);
    }
  }

  hide() {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this._loading.next(false);
    }
  }
}

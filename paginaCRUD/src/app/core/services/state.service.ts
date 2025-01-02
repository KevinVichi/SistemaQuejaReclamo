import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  setLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}

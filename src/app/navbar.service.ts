import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class NavbarService {
  public subject: Subject<'light' | 'dark'> = new BehaviorSubject<'light' | 'dark'>('light');

  setBackground(state: 'light' | 'dark') {
    this.subject.next(state);
  }
}

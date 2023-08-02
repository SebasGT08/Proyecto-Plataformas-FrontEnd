import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private reloadSource = new Subject<void>();

  reloadObservable = this.reloadSource.asObservable();

  reload() {
    this.reloadSource.next();
  }
}

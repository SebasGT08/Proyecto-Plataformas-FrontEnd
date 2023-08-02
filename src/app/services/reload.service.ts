import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private reloadSource = new Subject<void>();
  private reloadSource2 = new Subject<void>();

  reloadObservable = this.reloadSource.asObservable();

  reloadObservable2 = this.reloadSource2.asObservable();

  reload() {
    this.reloadSource.next();
    this.reloadSource2.next();
  }
}

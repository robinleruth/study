import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Connector } from './connector';
import { Entry } from './entry';

@Injectable()
export class MentalMathConnectorService implements Connector {

  constructor() { }

  getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getName(): string {
    return 'MENTAL MATH';
  }

  get(): Observable<Entry> {
    const op = this.getOperator();
    return of(new Entry('', '', 'text'));
  }

  private getOperator(): string {
    const arr = ['+', '-', '*', '/'];
    const idx = Math.floor(Math.random() * 4);
    return arr[idx];
  }
}

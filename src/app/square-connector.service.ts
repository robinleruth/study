import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Connector } from './connector';
import { Entry } from './entry';

@Injectable()
export class SquareConnectorService implements Connector {

  constructor() { }
  getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  get(): Observable<Entry> {
    const lst = [];
    for(let i = 0 ; i < 1 ; ++i) {
      lst.push(Math.floor(Math.random() * 99));
    }
    return from(lst.map(x => {
      return new Entry(String(x), String(x * x), 'number');
    }));
  }

  getName(): string {
    return 'SQUARED';
  }
}

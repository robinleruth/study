import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Connector } from './connector';
import { Entry } from './entry';

@Injectable()
export class MockConnectorService implements Connector {

  constructor() { }
  getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  get(): Observable<Entry> {
    return from([
      new Entry('a?', 'b', 'text'),
      new Entry('b?', 'c', 'text'),
      new Entry('c?', 'd', 'text')
    ]);
  }

  getName(): string {
    return 'MOCK';
  }
}

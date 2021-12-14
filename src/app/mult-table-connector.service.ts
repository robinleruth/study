import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Connector } from './connector';
import { Entry } from './entry';

@Injectable()
export class MultTableConnectorService implements Connector {

  constructor() { }
  getAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  get(): Observable<Entry> {
    const lst = [];
    for (let i = 0 ; i < 10 ; ++i) {
      lst.push(this.genEntry());
    }
    return from(lst);
  }
  
  private genEntry(): Entry {
    const nb1 = Math.floor(Math.random() * 10);
    const nb2 = Math.floor(Math.random() * 10);
    const q = nb1 + ' * ' + nb2 + ' ?';
    return new Entry(q, nb1 * nb2, 'number');
  }

  getName(): string {
    return 'MULT TABLE';
  }
}

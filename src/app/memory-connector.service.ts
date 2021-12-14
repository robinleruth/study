import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Connector } from './connector';
import { Entry } from './entry';

@Injectable()
export class MemoryConnectorService implements Connector {
  
  inputTypesByIdx: any = {
    0: 'number',
    1: 'text'
  }

  constructor(private http: HttpClient) { }

  getName(): string {
    return 'MEMORY';
  }

  get(): Observable<Entry> {
    return this.http.get<Memory[]>('assets/memoire.json').pipe(flatMap((value, idx) => {
      return from(this.shuffle(value).map(x => {
        const arr = [x.image, x.number];
        const r = Math.floor(Math.random() * 2);
        const q = arr[r];
        arr.splice(r, 1);
        const a = arr[0];
        const type = this.inputTypesByIdx[r];
        return new Entry(String(q), a, type);
      }));
    }))
  }

  getAll(): Promise<Memory[]> {
    return this.http.get<Memory[]>('assets/memoire.json').toPromise();
  }

  private shuffle(array: Memory[]): Memory[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}

export class Memory {
  number!: number;
  image!: string;
}
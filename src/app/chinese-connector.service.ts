import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { flatMap, map, take } from 'rxjs/operators';
import { Connector } from './connector';
import { Entry } from './entry';

@Injectable()
export class ChineseConnectorService implements Connector {

  constructor(private http: HttpClient) { }

  getAll(): Promise<Chinese[]> {
    return this.http.get<Chinese[]>('assets/chinese.json')
    .pipe(map(x => x.sort((a, b) => {
      if (a.chinese.toLowerCase() < b.chinese.toLowerCase()) return -1;
      else if (a.chinese.toLowerCase() > b.chinese.toLowerCase()) return 1;
      else return 0;
    }))).toPromise();
  }

  getName(): string {
    return 'CHINESE';
  }

  get(): Observable<Entry> {
    return this.http.get<Chinese[]>('assets/chinese.json').pipe(
      flatMap((value, idx) => {
        return from(this.shuffle(value).map(x => {
          const arr = [x.chinese, x.french];
          const r = Math.floor(Math.random() * 2);
          const q = arr[r];
          arr.splice(r, 1);
          const a = arr[0];
          return new Entry(q, a, 'text');
        }));
      }),
      take(10)
    );
  }


  private shuffle(array: Chinese[]): Chinese[] {
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

export class Chinese {
  chinese!: string;
  french!: string;
}
import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { zip } from 'rxjs/operators'
import { Connector, CONNECTORS } from '../connector';
import { Entry } from '../entry';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isRunning = false;
  selectedConnector: any;
  selectedConn: Connector | undefined;
  connectorNames: string[] = []
  connectorsByName: Map<string, Connector> = new Map();
  subject$: Subject<any> = new Subject();
  allDone = false;
  secondsPassed: number = 0;
  started: Date = new Date();
  detailOpened = false;

  questions: Entry[] = [];

  constructor(@Inject(CONNECTORS) connectors: Connector[]) { 
    connectors.forEach(c => {
      this.connectorNames.push(c.getName());
      this.connectorsByName.set(c.getName(), c);
    });
  }

  ngOnInit(): void {
  }

  go(): void {
    if (this.selectedConnector) {
      this.isRunning = true;
      const obs = this.connectorsByName.get(this.selectedConnector)?.get();

      this.allDone = false;
      this.detailOpened = false;
      this.secondsPassed = 0;
      this.questions = [];
      this.started = new Date();

      this.subject$ = new Subject();
      obs?.pipe(zip(this.subject$)).subscribe(n => {
          this.questions.push(n[0]);
        }, 
        undefined, 
        () => {
          this.allDone = true;
        }
      );
      this.subject$.next();
    }
  }

  next(): void {
    if (this.allDone) {
      // Stop timer and display result
      const now = new Date();
      this.secondsPassed = (now.getTime() - this.started.getTime()) / 1000;
    }
    this.subject$.next();
  }

  seeDetail(): void {
    if (this.selectedConnector) {
      this.detailOpened = true;
      this.selectedConn = this.connectorsByName.get(this.selectedConnector);
    }
  }

  clear(): void {
      this.allDone = false;
      this.detailOpened = false;
      this.secondsPassed = 0;
      this.questions = [];
      this.started = new Date();
  }
}

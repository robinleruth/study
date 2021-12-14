import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Entry } from '../entry';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements AfterViewInit {

  @Input() entry!: Entry;
  @Output() answered: EventEmitter<any> = new EventEmitter();
  isAnswered = false;
  answerGiven: any;

  @ViewChild('theInput') theInput!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.theInput.nativeElement.focus();
  }

  giveAnswer(): void {
    if (this.answerGiven) {
      this.isAnswered = true;
      this.answered.emit(null);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyup($event: KeyboardEvent): void {
    if (!this.isAnswered && $event.key.toUpperCase() === 'ENTER') {
      this.giveAnswer();
    }
  }
}

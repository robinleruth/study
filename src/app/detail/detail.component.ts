import { Component, Input, OnInit } from '@angular/core';
import { Chinese } from '../chinese-connector.service';
import { Connector } from '../connector';
import { Memory } from '../memory-connector.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() connector!: Connector | undefined;
  typesByName: any = {
    'chinese': Chinese,
    'memory': Memory
  }
  instances!: Chinese[] | Memory[];
  typeUsed: any;
  chineseInstances!: Chinese[];
  memoryInstances!: Memory[];

  constructor() { }

  ngOnInit(): void {
    this.connector?.getAll().then(x => {
      const type = this.typesByName[this.connector?.getName().toLowerCase() || 0];
      if (this.connector?.getName().toLowerCase() === 'chinese') {
        this.chineseInstances = x.map((y: any) => y as Chinese);
      } else if (this.connector?.getName().toLowerCase() === 'memory') {
        this.memoryInstances =  x.map((y: any) => y as Memory);
      } 
      this.typeUsed = type;
    });
  }
}

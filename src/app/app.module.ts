import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { CONNECTORS } from './connector';
import { MemoryConnectorService } from './memory-connector.service';
import { ChineseConnectorService } from './chinese-connector.service';
import { MockConnectorService } from './mock-connector.service';
import { ElementComponent } from './element/element.component';
import { HttpClientModule } from '@angular/common/http';
import { SquareConnectorService } from './square-connector.service';
import { MultTableConnectorService } from './mult-table-connector.service';
import { MentalMathConnectorService } from './mental-math-connector.service';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ElementComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide: CONNECTORS, multi: true, useClass: MemoryConnectorService},
    {provide: CONNECTORS, multi: true, useClass: ChineseConnectorService},
    {provide: CONNECTORS, multi: true, useClass: SquareConnectorService},
    // {provide: CONNECTORS, multi: true, useClass: MentalMathConnectorService},
    {provide: CONNECTORS, multi: true, useClass: MultTableConnectorService}
    // {provide: CONNECTORS, multi: true, useClass: MockConnectorService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

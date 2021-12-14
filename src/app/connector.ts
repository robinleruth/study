import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from './entry';

export interface Connector {
    get(): Observable<Entry>;
    getName(): string;
    getAll(): Promise<any>;
}

export const CONNECTORS = new InjectionToken<Connector>('Connectors');
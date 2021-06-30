import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customers } from './../app.component';
import { map, pluck } from 'rxjs/operators';

@Injectable()
export class DbService {
    customers = new Subject<Customers[]>();
    customers$ = this.customers.asObservable();
    appId = '1001';
    sid = '';
    url = '';

    constructor(private httpClient: HttpClient){
        if (environment.production) {
            this.fetchCustomers();
        } else {
            this.url = 'http://localhost:7360/valence/';
            //this.url = 'http://idemo:7160/valence/';

            this.sid = 'XX'; //Valence Developper Token
            
            this.fetchCustomers();
        }
    }   

    fetchCustomers(): any{
        const httpparams = new HttpParams()
        .set('pgm', 'EXGRIDALL')
        .set('action', 'loadGrid')
        .set('sid', this.sid)
        .set('app', this.appId);
        this.httpClient.get(this.url + 'vvcall.pgm', { params: httpparams })
        .pipe(
            map(x => JSON.stringify(x)),
            map(x => JSON.parse(x)),
            pluck("customers")
        )
        .subscribe((data : Customers[]) => {
            this.customers.next(data);
        });
    }
}

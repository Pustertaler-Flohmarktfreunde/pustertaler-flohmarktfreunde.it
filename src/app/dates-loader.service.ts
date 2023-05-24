import {Injectable} from '@angular/core';
import {map, Observable, share} from "rxjs";
import {CSVLine, IDateEntry} from "./models";
import {HttpClient} from "@angular/common/http";
import {Papa} from "ngx-papaparse";

@Injectable({
  providedIn: 'root'
})
export class DatesLoaderService {
  public locations: Observable<IDateEntry[]>;
  constructor(private httpClient: HttpClient, private papa: Papa<CSVLine[]>) {
    this.locations = httpClient.get('assets/dates.csv', {responseType: 'text'})
      .pipe(
        map(e => {
          return papa.parse(e, {
            header: true,
            skipEmptyLines: 'greedy',
            transformHeader: function (h) {
              return h.trim();
            },
            transform: function (h) {
              return h.trim();
            }
          });
        }),
        map(result => {
          return result.data.map(e => {
            let date = new Date(Date.parse(e.day));
            const data: IDateEntry = {
              day: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
              german: {
                location: e.locationDe,
                street: e.streetDe,
              },
              italian: {
                location: e.locationIt,
                street: e.streetIt,
              }
            }
            return data;
          });
        }),
        share(),
      );
  }
}

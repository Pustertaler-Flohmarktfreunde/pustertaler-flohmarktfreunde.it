import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Papa} from "ngx-papaparse";
import {CSVLine, IDateEntry} from "../models";


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  public locations: Observable<IDateEntry[]>;
  public now = new Date(Date.now());
  public today = new Date(this.now.getUTCFullYear(), this.now.getUTCMonth(), this.now.getUTCDate());

  constructor(private httpClient: HttpClient, private papa: Papa<CSVLine[]>) {
    this.locations = httpClient.get('pustertaler-flohmarktfreunde/assets/dates.csv', {responseType: 'text'})
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
      );
  }
}

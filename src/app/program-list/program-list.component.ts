import {Component} from '@angular/core';
import {DatesLoaderService} from "../dates-loader.service";


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  public now = new Date(Date.now());
  public today = new Date(this.now.getUTCFullYear(), this.now.getUTCMonth(), this.now.getUTCDate());

  constructor(public readonly eventDatesLoader: DatesLoaderService) {
  }
}

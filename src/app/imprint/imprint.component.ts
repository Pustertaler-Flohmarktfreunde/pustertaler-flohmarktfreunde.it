import {Component} from '@angular/core';

import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent {

  constructor(private readonly navbar: NavbarService) {
    navbar.setBackground('dark');
  }
}

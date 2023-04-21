import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('mainNav') mainNav!: ElementRef;

  constructor(public readonly navbar: NavbarService) {
  }


  @HostListener('window:scroll')
  onScroll() {
    this.navBarCollapse();
  }

  private navBarCollapse() {
    if (this.mainNav) {
      if (window.scrollY > 100) {
        this.mainNav.nativeElement.classList.add("navbar-scrolled");
      } else {
        this.mainNav.nativeElement.classList.remove("navbar-scrolled");
      }
    }
  }

}

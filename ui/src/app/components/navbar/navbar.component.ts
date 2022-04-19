import {Component, OnInit} from '@angular/core';
import {ClarityIcons, userIcon} from '@cds/core/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor() {
    ClarityIcons.addIcons(userIcon);
  }

  ngOnInit(): void {
  }

}

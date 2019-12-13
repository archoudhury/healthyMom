import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDetail } from '../models/userDetail';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  public userRole: number = 0;
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.subs.sink = this.userService.getsubject().subscribe(((data: UserDetail) => {
      if (data && data.token != "") {
        this.userRole = data.role;
      }
      else {
      }
    }))
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

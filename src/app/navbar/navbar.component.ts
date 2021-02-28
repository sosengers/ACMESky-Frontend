import { Component, OnInit } from '@angular/core';
import { NgbNav, NgbCollapse } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class Navbar implements OnInit {
  constructor(private route: ActivatedRoute,) { }

  private currentRoute: string = "";

  ngOnInit() {
    this.currentRoute = location.href;
    console.log(this.currentRoute);
  }

  public isMenuCollapsed = true;
}

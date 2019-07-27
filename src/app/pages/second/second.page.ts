import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  };
  onClick(){
    this.router.navigate(['']);
  };

}

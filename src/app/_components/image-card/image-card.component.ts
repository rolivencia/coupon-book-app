import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {

  @Input() page;

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateTo(route: string){
    this.router.navigate([route]);
  }

}

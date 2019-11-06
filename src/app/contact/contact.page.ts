import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  pages = [
    { id: "whatsapp", name: "", subtitle: '', route: '/coupons', icon: ''},
    { id: "instagram", name: "", subtitle: '', route: '/recommended', icon: ''},
    { id: "facebook", name: "", subtitle: '', route: '/contact', icon: ''},
    { id: "telephone", name: "", subtitle: '', route: '/profile'}
  ];

  constructor() { }

  ngOnInit() {
  }

}

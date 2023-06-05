import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as Aos from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title) {
    title.setTitle('Momotaro Foods');
  }
  ngOnInit(): void {
    Aos.init();
  }
}

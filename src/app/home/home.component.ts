import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('body-Home');
    console.log('ASD');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('body-Home');
  }
}

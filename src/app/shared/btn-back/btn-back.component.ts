import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.scss']
})
export class BtnBackComponent implements OnInit {
  @Input() backUrl: string;

  constructor(
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
  }

  back() {
    if (this.backUrl) {
      return this.router.navigate([this.backUrl]);
    }

    this.location.back();
  }

}

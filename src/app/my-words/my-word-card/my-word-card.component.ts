import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmationComponent} from '../../shared/modal/confirmation/confirmation.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-my-word-card',
  templateUrl: './my-word-card.component.html',
  styleUrls: ['./my-word-card.component.scss']
})
export class MyWordCardComponent implements OnInit, OnDestroy {
  @Input() word: {
    word: string,
    type: string,
    pronunciation: string,
    definition: string,
    example: string
  };
  private subscriptions: Subscription[] = [];
  modalSubscribe: any;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  editWord(event) {
    event.preventDefault();

    console.log('editWord');
  }

  deleteWord(event) {
    event.preventDefault();
    if (this.modalSubscribe) {
      this.modalSubscribe.unsubscribe();
    }

    console.log('deleteWord');

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        type: 'delete word',
        buttonText: 'Delete word'
      },
      panelClass: 'main-modal',
      autoFocus: false,
    });

    this.modalSubscribe = dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('res', res);
      }
    });
    this.subscriptions.push(this.modalSubscribe);
  }
}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../app.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  addWordForm: FormGroup;
  errorMessages: '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    public appService: AppService
  ) {
  }

  ngOnInit() {
    this.addWordForm = this.fb.group({
      word: ['', [Validators.required]],
      type: [''],
      pronunciation: [''],
      definition: [''],
      example: [''],
    });
    // this.addWordForm = this.fb.group({
    //   word: ['', [Validators.required]],
    //   type: ['', [Validators.required]],
    //   pronunciation: ['', [Validators.required]],
    //   definition: ['', [Validators.required]],
    //   example: ['', [Validators.required]],
    // });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = null;
  }

  addWorld(event) {
    event.preventDefault();

    this.errorMessages = '';

    const data = this.addWordForm.value;

    this.appService.saveWordToLocal(data);
  }
}

import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-sign-up-test',
  templateUrl: './dialog-sign-up-test.component.html',
  styleUrls: ['./dialog-sign-up-test.component.css']
})
export class DialogSignUpTestComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSignUpTestComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}

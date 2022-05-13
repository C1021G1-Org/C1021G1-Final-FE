import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(SignUpComponent)
  }

  ngOnInit(): void {
  }

}

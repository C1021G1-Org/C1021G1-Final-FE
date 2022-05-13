import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {BodyComponent} from './layout/body/body.component';
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxPaginationModule} from "ngx-pagination";
import {CdkTableModule} from "@angular/cdk/table";
import {FlightModule} from "./flight/flight.module";
import {ForgetedPasswordComponent} from "./login/forgeted-password/forgeted-password.component";
import {MatDialogModule} from "@angular/material/dialog";
import {PhonePipe} from "./employee/phone.pipe";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {ToastrModule} from "ngx-toastr";
import {CustomerModule} from "./customer/customer.module";
import {ChangePasswordComponent} from "./login/change-password/change-password.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    SignUpComponent,
    SignInComponent,
    ForgetedPasswordComponent,
    PhonePipe,
    ChangePasswordComponent
  ],
  imports: [
    CustomerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CdkTableModule,
    FlightModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  exports: [
    PhonePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

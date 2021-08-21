import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required])
  });

  firstFormGroup = new FormGroup({
    'firstCtrl': new FormControl(null, [Validators.required]),
  });
  secondFormGroup = new FormGroup({
    'secondCtrl': new FormControl(null, [Validators.required]),
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    
  }

  login(stepper: MatStepper) {
    stepper.next();
  }

}

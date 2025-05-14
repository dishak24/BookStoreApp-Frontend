import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent 
{
  isSignup: boolean = false;
  hidePassword: boolean = true;
  LoginForm!: FormGroup;
  RegisterForm!: FormGroup;

  constructor(private formbuilder: FormBuilder,private snackbar:MatSnackBar) {}

  togglePassword() 
  {
    this.hidePassword = !this.hidePassword;
  }

  showSignup() 
  {
    this.isSignup = true;
  }

  showLogin() 
  {
    this.isSignup = false;
  }

  
  ngOnInit(): void 
  {
    //for login validations
    this.LoginForm = this.formbuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }
  );

    //for signup validations
    this.RegisterForm = this.formbuilder.group(
    {
      fullname: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/)]]
      
    });
  }


  
}

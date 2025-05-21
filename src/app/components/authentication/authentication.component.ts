import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

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

  constructor
  (
    private formbuilder: FormBuilder, 
    private snackbar:MatSnackBar,
    private user: UserService,
    private router: Router
  ) {}

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
      fullName: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/)]]
      
    });
  }


  //Registration
  onCreateAccount() 
  {
      if (this.RegisterForm.invalid) 
      {
        const controls = this.RegisterForm.controls;
    
        if (controls['fullName'].errors?.['required']) 
        {
          this.snackbar.open('Full Name is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['fullName'].errors?.['pattern']) 
        {
          this.snackbar.open('Full Name should contain only letters.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['email'].errors?.['required']) 
        {
          this.snackbar.open('Email is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['email'].errors?.['pattern']) 
        {
          this.snackbar.open('Enter a valid email address.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['password'].errors?.['required']) 
        {
          this.snackbar.open('Password is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['password'].errors?.['pattern']) 
        {
          this.snackbar.open('Password must be 8+ characters with uppercase, lowercase, number, and special character.', 'Close', { duration: 4000, panelClass: ['error-snackbar'] });
        } 
        
        else if (controls['mobile'].errors?.['required']) 
        {
          this.snackbar.open('Mobile number is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['mobile'].errors?.['pattern']) 
        {
          this.snackbar.open('Enter a valid mobile number.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
        return;
      }
      
        const formData = this.RegisterForm.value;
        
        const userData = 
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile
        };
    
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved to local storage:', userData);
    
        const payload = 
        {
          fullName: this.RegisterForm.value.fullName,
          email: this.RegisterForm.value.email,
          password: this.RegisterForm.value.password,  
          mobile: this.RegisterForm.value.mobile
        };
    
        // Checking payload values
        console.log('Payload:', payload);
    
        this.user.register(payload).subscribe(
        {
          next: (result) => 
          {
            console.log('User registered successfully!', result);
            
            // Show success Snackbar
            this.snackbar.open('Registration successful !', 'Close', 
            {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
  
          },
          error: (err) => {
            console.error('Registering user Failed !!', err);
          
            let errorMsg = 'Registration failed. Please try again.';
          
            if (err?.error?.message?.includes('Email already exist! Please, Enter another EmailId.')) {
              errorMsg = 'Email already exist! Please, Enter another EmailId.';
            }
          
            this.snackbar.open(errorMsg, 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
          
        });
      
    }

  //login
  onSubmit() 
  {

    if (this.LoginForm.invalid) {
      const emailControl = this.LoginForm.get('email');
      const passwordControl = this.LoginForm.get('password');
  
      // Show specific snackbar message based on what’s wrong
      if (emailControl?.hasError('required')) 
      {
        this.snackbar.open('Email is required.', 'Close', 
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } 
      else if (emailControl?.hasError('pattern')) 
      {
        this.snackbar.open('Enter a valid email address.', 'Close', 
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } 
      else if (passwordControl?.hasError('required')) 
      {
        this.snackbar.open('Password is required.', 'Close', 
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } 
      else if (passwordControl?.hasError('pattern')) 
      {
        this.snackbar.open(
          'Password must be 8+ characters, with uppercase, lowercase, number, and special character.',
          'Close',
          {
            duration: 4000,
            panelClass: ['error-snackbar']
          }
        );
      }
      return;
    }
    console.log("Login data:", this.LoginForm.value);

    const payload = 
    {
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password
    };

    this.user.login(payload).subscribe({
      next: (result: any) => 
      {
        console.log('Login successful:', result);

        //Normalize token to ensure "Bearer " prefix
        // Clean token and store it in localStorage
        let token = result.data.accessToken;
        let refreshToken = result.data.refreshToken;
        if (token.startsWith('Bearer ')) 
        {
          token = token.replace('Bearer ', '');
        }
      // Store the token in localStorage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);

        localStorage.setItem('user', JSON.stringify(result.data.name));

        this.snackbar.open('Login successful!', 'Close', 
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.router.navigate(['/dashboard/home']);
      },
      error: (error) => 
      {
        console.error('Login failed:', error);

        this.snackbar.open('Login failed!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  
}

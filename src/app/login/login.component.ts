import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 username: string ='';
 password: string='';

form: FormGroup;
  loginForm: any;

 constructor (private router: Router,private authService: AuthService, private fb: FormBuilder){
  this.form= this.fb.group({
    username: ['',Validators.required],
    password: ['',[Validators.required, Validators.minLength(2)]]
  });

 }
 
  onSubmit(): void{
   
    if(this.form.valid) {
      const username= this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      this.authService.authenticate(username, password).subscribe({
        next: (user) => {
          if(user) {
            sessionStorage.setItem('userId', user.id.toString());
            this.router.navigate(['/client']);
          } else {
            alert('Credenziali non valide');
          }
        },
        error: (err) => {
          console.error('Errore del server', err);
        }

      });

    }
  }
 
 printValues(): void {
  console.log ('Username:',this.username);
  console.log ('Password:',this.password);
 }

}

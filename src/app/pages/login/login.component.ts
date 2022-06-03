import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logInData = {
    username:'',
    password:''
  };
  constructor(private snack :MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login btn clicked");
    if(this.logInData.username.trim()=='' || this.logInData.username==null) {
      this.snack.open("username is required",'',
      {
        duration:3000,
      });
      return;
    }

    if(this.logInData.password.trim()=='' || this.logInData.password==null) {
      this.snack.open("password is required",'',
      {
        duration:3000,
      });
      return;
    }

    // request to server to generate a token

    this.login.generateToken(this.logInData).subscribe( 
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login ....
        this.login.logInUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect ...ADMIN: admin-dashboard
            //redirecr ...NORMAL: normal-dashboard 
            if(this.login.getUserRole()=="ADMIN"){
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);

            } else if(this.login.getUserRole()=="NORMAL") {
               
              // window.location.href = '/user-dashboard'
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          }
        )
      },
      (error:any)=>{
        console.log("error");
        console.log(error);
        this.snack.open('invalid credentials','',{
          duration: 2000,
          verticalPosition:"bottom", 
        })
      }
    )


  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private userService: UserService, private snack:MatSnackBar) { }

  public user ={
    username:'',
    password:'',
    firstName:'',
    lastName: '',
    email: '',
    phone:''
  }

  ngOnInit(): void {
  }

  formSubmit(){

    if(this.user.username == '' || this.user.username == null) {
      //alert("user is required");
      this.snack.open('username is required','',{
        duration: 2000,
        verticalPosition:"top", 
      })
      return;
    }
    this.userService.addUser(this.user).subscribe((data)=>{
      console.log(data);
      //alert('success');
      Swal.fire("Successful","Registration is done","success")
    },(error)=>{
      console.log(error);
      // alert("something went wrong");
      this.snack.open('May be user is already exist','',{
        duration: 2000,
        verticalPosition:"top", 
      })

    })
  }

}

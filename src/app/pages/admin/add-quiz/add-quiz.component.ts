import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
      id:23,
      title:'programming'
    },
    {
      id:23,
      title:'programming'
    }
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      id:''
    }
  }
  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any)=>{
        // categoried load
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('ERROR !!','error in loading data','error')
      }
    )
  }

  addQuiz() {
    // console.log(this.quizData)
    if(this.quizData.title.trim()=='' || this.quizData.title== null) {
      this._snack.open('title required','',{
        duration:3000,
      });
      return
    }

    // to add quiz, we have to call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','quiz is added','success')
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            id:''
          }
        }
      },
      (error)=>{
         Swal.fire('error!!','error while adding quiz',error);
         console.log(error);
      }
    )

  }

}

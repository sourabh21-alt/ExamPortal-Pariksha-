import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  questions:any;
  qid:any;
  qTitle:any;
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params['id'];
    this.qTitle=this._route.snapshot.params['title'];
    // console.log(this.qTitle,this.qid);

    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data)=>{
        this.questions = data;
        console.log(this.questions)
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  // delete question
  public deleteQuestion(questionId:any) {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure?'
    }).then(
      (result)=>{
        if(result.isConfirmed) {
          this._question.deleteQuestion(questionId).subscribe(
            (data)=>{
              this._snack.open('Question Deleted','',{
                duration:3000,
              });

              this.questions= this.questions.filter((q:any)=>q.quesId != questionId)
            },
            (error)=>{
              this._snack.open('Erro in deleting Question','',{
                duration:3000
              })
            }

          )
        }

      }
    )
  }

}

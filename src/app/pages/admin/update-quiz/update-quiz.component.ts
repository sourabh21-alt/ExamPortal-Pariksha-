import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _category:CategoryService,
    private _router:Router) { }
  
  qid=0;
  quizData:any;
  categories:any;

  ngOnInit(): void {
    this.qid =this._route.snapshot.params['qid'];
    // alert(this.qid)
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quizData=data;
        console.log(this.quizData);

      },
      (error)=>{
        console.log(error);
      }
    );

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
         
      },
      (error)=>{
        alert("error in loading category")
      }
    )
  }

  // update form submit
  public updateData() {
    
    this._quiz.updateQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success',"quiz updated",'success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        })

      },
      (error)=>{
        Swal.fire('Error',"error in updating",'error')
      }
    )
  }

}

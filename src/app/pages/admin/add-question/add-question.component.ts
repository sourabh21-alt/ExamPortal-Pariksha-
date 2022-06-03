import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qid:any;
  qTitle:any;
  question={
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qid:''
    }
  }
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ) { }


  ngOnInit(): void {
    this.qid= this._route.snapshot.params['qid'];
    this.qTitle= this._route.snapshot.params['title']
    this.question.quiz.qid=this.qid;
  }

  formSubmit() {
    if(this.question.content.trim()=='' || this.question.content == ''){
      return;
    }

    if(this.question.option1.trim()=='' || this.question.option1== ''){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2== ''){
      return;
    }

    // form submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","question added",'success')
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error)=>{
        Swal.fire('Error!!','error in adding question',error)
      }
    )

  }

}

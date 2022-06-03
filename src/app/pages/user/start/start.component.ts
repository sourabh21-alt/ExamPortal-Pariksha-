import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  isSubmit=false;


  marksGot=0;
  correctAnswers=0;
  attempted = 0;

  timer:any;

  constructor(
    private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
  ) { }

  ngOnInit(): void {

    this.preventBackButton()
    this.qid = this._route.snapshot.params['qid'];
    // alert(this.qid)
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data:any)=>{
       
        
        this.questions=data;
        this.timer=this.questions.length*2*60;
          console.log(this.questions);
        this.startTimer();


      },
      (error)=>{
        Swal.fire("Error","error in loading",'error')
      }
    )
  }

  preventBackButton() {
    history.pushState(null,'',location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,'',location.href)
    })
  }

  public submitQuiz() {
    Swal.fire(
      {
        title:'Do you want to submit the quiz',
        showCancelButton: true,
        confirmButtonText: ' Submit',
        icon:'info'
      }
    ).then(
      (e)=>{
        if(e.isConfirmed) {

          this.evalQuiz();

        }
      }
    )
  }

  public startTimer() {
    
    let t =  window.setInterval(()=>{
      if(this.timer<=0) {
        this.evalQuiz()
        clearInterval(t);
      }
      else {
        this.timer--;
      }

    },1000)
  }

  public getFormattedTime() {
    let minutes = Math.floor(this.timer/60);
    let seconds= this.timer % 60; 

    return `${minutes} min : ${seconds} sec`
  }

  public evalQuiz() {

    // this.isSubmit=true;
    //       // console.log(this.questions);
    //       this.questions.forEach((q:any)=>{

    //         if(q.givenAnswer==q.answer) {
    //           this.correctAnswers++;
    //           let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
    //           this.marksGot+=marksSingle;
    //         }

    //         if(q.givenAnswer.trim()!='') {
    //           this.attempted++
    //         }

    //       })

    // call the Server(secure way)

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.isSubmit=true;
        this.marksGot=data.marksGot;
        this.correctAnswers=data.correctAnswers;
        this.attempted = data.attempted;
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  public printPage() {
    window.print();
  }

}

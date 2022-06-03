import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any) {

    return this._http.get(`${baseUrl}/question/quiz/${qid}`)

  }

  // add a question
  public addQuestion(question:any) {
    return this._http.post(`${baseUrl}/question/`,question);
  }

  // delete a question
  public deleteQuestion(questionId:any) {

    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval-quiz
  public evalQuiz(questions:any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
  }
}

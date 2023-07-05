import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICategory } from '../models/category';
import { IQuiz, Question, QuestionResult } from '../models/quiz';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class QuizMakerService {
  private categoryApiURL = 'https://opentdb.com/api_category.php';
  private quizApiURL = 'https://opentdb.com/api.php?amount=5&type=multiple';

  public questionsResult: QuestionResult[] = [];

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getCategories(): Observable<ICategory> {
    return this.http
      .get<ICategory>(this.categoryApiURL)
      .pipe(retry(1), catchError(this.handleError));
  }
  
  getQuestions(category: number, difficulty: string): Observable<IQuiz> {
    return this.http
      .get<IQuiz>(
        this.quizApiURL + '&category=' + category + '&difficulty=' + difficulty
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  get getQuestionsResult(){
    return this.questionsResult;
  } 
 
  setQuestionsResult(questionsResult: QuestionResult[]){
    this.questionsResult = questionsResult;
  }

  enrich(toEnrichObj:Question[]){
    let questionsResult = <QuestionResult[]>[];
    toEnrichObj.forEach((item, i) => {
      questionsResult[i] = { ...item };
      let all_answers = <string[]>[];
      for (const [key, value] of Object.entries(item)) {
        if (key == 'incorrect_answers') {
          all_answers.push(...value);
        } else if (key == 'correct_answer') {
          all_answers.push(value);
        }
      }
      questionsResult[i]['all_answers'] = all_answers.sort(
        () => Math.random() - 0.5
      );
    });
    return questionsResult;
  }
}

import { Component, OnInit } from '@angular/core';
import { QuestionResult } from '../../models/quiz';
import { Category } from '../../models/category';
import { DIFFICULTIES } from '../../mock/mock-difficulties';
import { Difficulty } from '../../models/difficulty';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { QuizMakerService } from '../../services/quiz-maker.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questionsResult: QuestionResult[];

  allAnswers: string[] = [];
  categories: Category[];
  difficulties: Difficulty[] = DIFFICULTIES;
  quizForm: FormGroup = new FormGroup({
    category: new FormControl(null, Validators.required),
    difficulty: new FormControl(null, Validators.required),
  });
  answersForm: FormGroup;
  constructor(public quizMakerService: QuizMakerService, private _router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }
  onSubmitCreateQuiz() {
    // TODO: Use EventEmitter with form value
    this.quizMakerService
      .getQuestions(
        this.quizForm.get('category').value,
        this.quizForm.get('difficulty').value
      )
      .subscribe((data) => {
        if (data.response_code == 0) {
          //console.log('data.results', data.results);
          this.questionsResult = [];
          this.questionsResult = this.quizMakerService.enrich(data.results);
          //console.log('this.questionsResult', this.questionsResult);
          this.quizMakerService.setQuestionsResult(this.questionsResult);
          let group = {};
          this.questionsResult.forEach((input_template) => {
            group[input_template.question] = new FormControl(
              '',
              Validators.required
            );
          });
          this.answersForm = new FormGroup(group);
        }
      });
  }
  loadCategories() {
    return this.quizMakerService.getCategories().subscribe((data) => {
      if (data.trivia_categories) {
        this.categories = data.trivia_categories;
      }
    });
  }
  onSubmitAnswers() {
    for (const [formKey, formValue] of Object.entries(this.answersForm.value)) {
      this.questionsResult.forEach((item, i) => {
        if (item.question == formKey) {
          this.questionsResult[i].answered = formValue as string;
          if(this.questionsResult[i].answered==this.questionsResult[i].correct_answer){
            this.questionsResult[i]['score']=1;
          }else{
            this.questionsResult[i]['score']=0;
          };
        }
      });
    }
    this.quizMakerService.setQuestionsResult(this.questionsResult);
    this._router.navigateByUrl('/results');
    //console.log('onSubmitAnswers', this.answersForm.value);
    //console.log('this.questionsResult', this.questionsResult);
  }
  
}

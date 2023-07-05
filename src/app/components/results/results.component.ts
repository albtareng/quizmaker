import { Component, OnInit } from '@angular/core';
import { QuizMakerService } from '../../services/quiz-maker.service';
import { Router } from '@angular/router';
import { QuestionResult } from '../../models/quiz';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  questionsResult: QuestionResult[];
  totalScore: number = 0;
  constructor(public quizMakerService: QuizMakerService, private _router: Router) {}

  ngOnInit() {
    this.questionsResult = this.quizMakerService.getQuestionsResult;
    this.questionsResult.forEach((item) => {
      this.totalScore+=item.score;
    });
  }

}

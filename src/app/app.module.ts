import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [AppComponent,QuizComponent,ResultsComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

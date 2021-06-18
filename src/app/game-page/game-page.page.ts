import { Router } from '@angular/router';
import { Question } from './../entities/question';
import { GameDataService } from './../services/game-data.service';
import { ToastServiceService } from './../services/toast-service.service';
import { Component, OnInit } from '@angular/core';
import { OpenTriviaServiceService } from '../services/open-trivia-service.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.page.html',
  styleUrls: ['./game-page.page.scss'],
})
export class GamePagePage implements OnInit {

  constructor(
    private ToastService: ToastServiceService,
    private Router: Router,
    public QuestionService: OpenTriviaServiceService, 
    public GameDataService: GameDataService
    ) { }

  ngOnInit() {
    if(this.GameDataService.isStartable()){
      this.GameDataService.randomAvatar();
    }else{
      this.Router.navigate(['/'])
    }
    
  }

  checkColor(param:string): string{
    if(this.QuestionService.answered && param == this.QuestionService.current_question.correct_answer) {
        return 'success';
    }else if( !this.QuestionService.answered) {
        return 'medium';
    }else{
        return 'danger';
    }
  }

  questionSuivante(): void {
    if(this.QuestionService.answered) {
      this.QuestionService.answered = false;
      this.QuestionService.handleQuestions();
    }else{
      this.ToastService.showToast("Vous devez sélectionner une réponse avant de passer à la question suivante", 'ERREUR', 'danger');
    }
  }

  
}

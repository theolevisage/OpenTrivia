import { Router } from '@angular/router';
import { GameDataService } from './../services/game-data.service';
import { Component, OnInit } from '@angular/core';
import { OpenTriviaServiceService } from './../services/open-trivia-service.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.page.html',
  styleUrls: ['./score-page.page.scss'],
})
export class ScorePagePage implements OnInit {

  constructor(
    public QuestionService: OpenTriviaServiceService,
    public GameDataService: GameDataService,
    private Router: Router
  ) { }

  ngOnInit() {
    if(!this.GameDataService.isStartable()){
      this.Router.navigate(['/'])
    }
  }

  getScoreString() {
    if(3 > this.QuestionService.score) {
      return `T'es sérieux ??!! Seulement ${this.QuestionService.score} points ! Mouhahaha !`
    }else if(6 >= this.QuestionService.score) {
      return `Pas mal ! Tu as marqué ${this.QuestionService.score} points ! Mais tu peux mieux faire !`
    }else if(9 >= this.QuestionService.score) {
      return `Tes amis te surnoment Joe LA MACHINE ! Tu as marqué ${this.QuestionService.score} points ! A quand le score parfait ?!`
    }else{
      return `T'es vraiment incollable !! ${this.QuestionService.score} points ! Le dieu des trivial poursuit !`
    }
  }
}

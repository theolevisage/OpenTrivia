import { GameDataService } from './../services/game-data.service';
import { Component, OnInit } from '@angular/core';
import { OpenTriviaServiceService } from './../services/open-trivia-service.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  begin_game: boolean = false;

  constructor( 
    private QuestionService: OpenTriviaServiceService, 
    private ToastService: ToastServiceService,
    private Router: Router, 
    public GameDataService: GameDataService
    ) {

    }
  ngOnInit(): void {
    this.GameDataService.getDataStorage();
  }

  start(): void {

    if( this.GameDataService.isStartable() ) {
      if(this.GameDataService.save) {
        this.GameDataService.setDataStorage();
      }
      this.QuestionService.handleQuestions().then( () => {
        this.Router.navigate(['/game'])
      }); 
    }else{
      this.ToastService.showToast("Veuillez rentrer un pseudo et une difficulté !", 'ERREUR', 'danger');
    }
  }
}

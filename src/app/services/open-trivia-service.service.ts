import { GameDataService } from './game-data.service';
import { Question } from '../entities/question';
import { Injectable } from '@angular/core';
import{ HttpClient } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaServiceService {

  questions: Array<Question> = [];
  current_question: Question;
  responses: string[] = [];
  current_index: number = 0;
  answered: boolean = false;
  last_question: boolean = false;
  score: number = 0;

  constructor( private http: HttpClient, private GameDataService: GameDataService ) { }


  async handleQuestions() {
    if(this.current_question == undefined) {
      await this.getQuestions( this.GameDataService.number_questions, this.GameDataService.difficulty_choice );
    }else if(this.current_index + 1 <= this.questions.length) {
      this.current_index++;
      
      if(this.current_index + 1 == this.questions.length) {
        this.last_question = true;
      }
    }

    if(this.last_question == false) {
      this.current_question = this.questions[this.current_index];
    }
    
    this.handleResponses();
  }

  handleResponses() {
    this.responses = [];
    this.current_question.incorrect_answers.forEach( el => {
      this.responses.push(el);
    }); 
    this.responses.push(this.current_question.correct_answer);
    this.responses = this.shuffle(this.responses);
  }

  response(param: string): void {
    if( this.current_question.correct_answer == param && !this.answered) {
      this.score++
    }
    this.answered = true;
  }

  async getQuestions(nb: number, difficulty: string): Promise<void> {

    await this.callApiTrivia(nb, difficulty);
    this.questions = this.shuffle(this.questions);
    this.questions.length = nb;
  }

  async callApiTrivia(nb: number, difficulte: string) {
    await this.http.get(`https://opentdb.com/api.php?amount=${nb}&category=15&difficulty=${difficulte}`)
    .toPromise()
    .then( res => {
        this.questions = res['results'];
    })
  }

  shuffle(array: Array<any>): Array<any> {
    return array.sort(() => Math.random() - 0.5);
  }

  resetGame() :void {
      this.score = 0;
      this.answered = false;
      this.last_question = false;
      this.current_index = 0;
  }
}

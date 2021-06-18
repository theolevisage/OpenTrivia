import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  username: string = '';
  difficulties: Array<string> = ['easy', 'medium', 'hard'];
  difficulty_choice: string = ""
  save: boolean = false;
  number_questions: number = 10;
  random_avatar: string = 'https://randomuser.me/api/portraits/lego/6.jpg';

  constructor( private storage: Storage) { }

  randomAvatar() :void {
    this.random_avatar = `https://randomuser.me/api/portraits/lego/${Math.floor((Math.random() * 9) + 1)}.jpg`;
  } 

  isStartable(): boolean {
    if(3 > this.username.trim().length || 0 === this.difficulty_choice.trim().length){
      return false;
    }else{
      return true;
    }
  }

  async getDataStorage() {
    await this.storage.create();
    this.storage.get('username').then( data => {
      this.username = data;
    });
    this.storage.get('difficulty').then( data => {
      this.difficulty_choice = data;
    });
    this.storage.get('save').then( data => {
      this.save = data;
    });
  }

  setDataStorage() {
    this.storage.set('username', this.username);
    this.storage.set('difficulty', this.difficulty_choice);
    this.storage.set('save', this.save);
  }
  
}
